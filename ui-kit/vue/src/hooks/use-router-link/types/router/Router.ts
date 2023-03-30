import type { RouteLocationRaw } from '../route'

export interface Router {
  push: (to: RouteLocationRaw) => Promise<void | undefined>
}
