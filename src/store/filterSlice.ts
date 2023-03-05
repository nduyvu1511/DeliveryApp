import { DateFilter } from '@/types'
import create from 'zustand'

interface FilterSlice {
  routeParams: DateFilter | undefined
  setRouteParams: (_: DateFilter | undefined) => void
  routeHistoryParams: DateFilter | undefined
  setRouteHistoryParams: (_: DateFilter | undefined) => void
}

export const useFilterSlice = create<FilterSlice>((set) => ({
  routeParams: undefined,
  routeHistoryParams: undefined,
  setRouteParams: (val: DateFilter | undefined) => set((state) => ({ ...state, routeParams: val })),
  setRouteHistoryParams: (val: DateFilter | undefined) =>
    set((state) => ({ ...state, routeHistoryParams: val })),
}))
