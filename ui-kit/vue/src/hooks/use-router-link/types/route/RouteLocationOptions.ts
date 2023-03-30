import type { HistoryState } from './history'

export interface RouteLocationOptions {
  replace?: boolean
  force?: boolean
  state?: HistoryState
}
