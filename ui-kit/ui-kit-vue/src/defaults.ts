import { Components } from './component'
import { makeInstaller } from './make-installer'

export const installer = makeInstaller([...Components])
