export interface StepItemState {
  uid: number | undefined
  currentStatus: string
  setIndex: (val: number) => void
  calcProgress: (status: string) => void
}
