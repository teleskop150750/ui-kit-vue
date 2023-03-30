interface HistoryStateArray extends Array<HistoryStateValue> {}

type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray

export interface HistoryState {
  [x: number]: HistoryStateValue
  [x: string]: HistoryStateValue
}
