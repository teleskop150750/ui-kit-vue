import { readFile, writeFile } from 'node:fs/promises'
import * as path from 'node:path'

import findWorkspaceDir from '@pnpm/find-workspace-dir'
import findWorkspacePackages from '@pnpm/find-workspace-packages'
import camelcase from 'camelcase'
import chalk from 'chalk'
import consola from 'consola'
import glob from 'fast-glob'
import { emptyDir, ensureDir } from 'fs-extra'
import { type BuiltInParserName, format } from 'prettier'

import { pathComponents } from './paths'

async function getSvgFiles() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const pkgs = await (findWorkspacePackages.default as typeof findWorkspacePackages)(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error

    (await findWorkspaceDir.default(process.cwd()))!,
  )

  const pkg = pkgs.find((_pkg) => _pkg.manifest.name === '@nado/ui-kit-icons-svg')!

  return glob('*.svg', { cwd: pkg.dir, absolute: true })
}

function getName(file: string) {
  let filename = path.basename(file).replace('.svg', '')

  filename = `NIcon${camelcase(filename, {
    pascalCase: true,
    preserveConsecutiveUppercase: true,
  })}`
  const componentName = filename

  return {
    filename,
    componentName,
  }
}

function formatCode(code: string, parser: BuiltInParserName = 'typescript') {
  return format(code, {
    parser,
    semi: false,
    singleQuote: true,
  })
}

async function transformToVueComponent(file: string) {
  const content = await readFile(file, 'utf8')
  const { filename, componentName } = getName(file)
  const vue = formatCode(
    `
<template>
${content}
</template>
<script lang="ts">
import type { DefineComponent } from 'vue'
export default ({
  name: "${componentName}",
}) as DefineComponent
</script>`,
    'vue',
  )

  writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, 'utf8')
}

async function generateEntry(files: string[]) {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file)

        return `export { default as ${componentName} } from './${filename}.vue'`
      })
      .join('\n'),
  )

  await writeFile(path.resolve(pathComponents, 'index.ts'), code, 'utf8')
}

consola.info(chalk.blue('generating vue components'))
await ensureDir(pathComponents)
await emptyDir(pathComponents)
const files = await getSvgFiles()

consola.info(chalk.blue('generating vue files'))
await Promise.all(files.map((file) => transformToVueComponent(file)))

consola.info(chalk.blue('generating entry file'))
await generateEntry(files)
