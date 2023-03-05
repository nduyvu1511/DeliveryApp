import { BTDeviceRes } from '@/types'
import create from 'zustand'

interface CommonSlice {
  backdropVisible: boolean
  setBackdropVisible: (_: boolean) => void
  bluetoothDevice: BTDeviceRes | undefined
  setBluetoothDevice: (_: BTDeviceRes | undefined) => void
}

export const useCommonSlice = create<CommonSlice>((set) => ({
  backdropVisible: false,
  setBackdropVisible: (val: boolean) => set((state) => ({ ...state, backdropVisible: val })),
  bluetoothDevice: undefined,
  setBluetoothDevice: (val: BTDeviceRes | undefined) =>
    set((state) => ({ ...state, bluetoothDevice: val })),
}))
