import fs from 'node:fs'
import path from 'node:path'

import del from 'del' // удалить папки/файлы
import gulp from 'gulp'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import csso from 'postcss-csso'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

export const clean = () => del('dist')

export const stylesTokens = () =>
  gulp
    .src('src/tokens/index.css')
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(rename('tokens.css'))
    .pipe(gulp.dest('dist'))

export const stylesTheme = () =>
  gulp
    .src('src/theme.css')
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(gulp.dest('dist'))

export const stylesComponents = () => {
  const paths = getComponentsPath()

  return gulp
    .src(paths)
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(
      rename((_path) => {
        _path.basename = _path.dirname
        _path.dirname = ''
      }),
    )
    .pipe(gulp.dest('dist/components'))
}

export const stylesAllComponents = () =>
  gulp
    .src(['src/components/index.css'])
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('dist/components'))

export const stylesAll = () =>
  gulp
    .src(['src/all.css'])
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(rename('index.css'))
    .pipe(gulp.dest('dist'))

export const stylesFonts = () =>
  gulp
    .src('src/fonts/index.css')
    .pipe(postcss([postcssImport, postcssNested, csso]))
    .pipe(rename('fonts.css'))
    .pipe(gulp.dest('dist'))

export const fonts = () => gulp.src('src/fonts/*.woff2').pipe(gulp.dest('dist'))

function getComponentsPath() {
  const allPaths = getAllFiles('./src/components')

  const ignorePaths = allPaths
    .filter((/** @type string */ _path) => {
      const chunks = _path.split('/')

      return chunks.length > 4 && chunks.at(-1) === 'index.css'
    })
    .map((el) => `!${el}`)

  return ['src/components/**/index.css', '!src/components/index.css', ...ignorePaths]
}

function getAllFiles(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      fileList = getAllFiles(`${dirPath}/${file}`, fileList)
    } else {
      fileList.push(path.join(dirPath, '/', file))
    }
  })

  return fileList
}

export const watch = () => {
  clean()
  stylesTokens()
  stylesTheme()
  stylesFonts()
  stylesComponents()
  stylesAllComponents()
  stylesAll()
  gulp.watch('./src/**/*.css', stylesTheme)
  gulp.watch('./src/**/*.css', stylesFonts)
  gulp.watch('./src/**/*.css', stylesComponents)
  gulp.watch('./src/**/*.css', stylesAllComponents)
  gulp.watch('./src/**/*.css', stylesAll)
  gulp.watch('./src/fonts/*.woff2', fonts)
}

export default gulp.series(
  clean,
  gulp.parallel(stylesTokens, stylesTheme, stylesFonts, fonts, stylesComponents, stylesAllComponents, stylesAll),
)
