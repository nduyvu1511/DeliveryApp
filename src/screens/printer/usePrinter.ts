import { logoBase64 } from '@/assets'
import { useCommonSlice } from '@/store'
import { BTDeviceRes, ScanDeviceRes } from '@/types'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import {
  Alert as RAlert,
  DeviceEventEmitter,
  Linking,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'
import BluetoothStateManager from 'react-native-bluetooth-state-manager'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export const usePrinter = () => {
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const setBluetoothDevice = useCommonSlice((state) => state.setBluetoothDevice)
  const bluetoothDevice = useCommonSlice((state) => state.bluetoothDevice)
  const [devices, setDevices] = useState<BTDeviceRes[]>([])
  const [isFinding, setIsFinding] = useState<boolean>(false)
  const [isActiveBluetooth, setIsActiveBluetooth] = useState<boolean>(false)
  const [hasPermission, setHasPermission] = useState<boolean>(false)

  useEffect(() => {
    requestBluetoothPermission(() => !bluetoothDevice?.address && scanDevices())
  }, [])

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager)
      // bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
      //   deviceAlreadPaired(rsp)
      // })
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
        deviceFoundEvent(rsp)
      })
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setBluetoothDevice(undefined)
      })
    } else if (Platform.OS === 'android') {
      // DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
      //   deviceAlreadPaired(rsp)
      // })
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
        deviceFoundEvent(rsp)
      })
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setBluetoothDevice(undefined)
      })
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
        requestOpenSetting()
      })
    }

    return () => {
      DeviceEventEmitter.removeAllListeners()
    }
  }, [])

  const print = async () => {
    console.log('call to print')
    // await BluetoothEscposPrinter.printPic(logoBase64, { width: 250, left: 150 })

    // await BluetoothEscposPrinter.printColumn(
    //   [24, 24],
    //   [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
    //   ['Customer', 'Prawito Hudoro'],
    //   {}
    // )
  }

  // const deviceAlreadPaired = (_device: BTDeviceRes | string) => {
  //   try {
  //     const device: BTDeviceRes = (_device as BTDeviceRes)?.address
  //       ? _device
  //       : JSON.parse(_device as string)

  //     const index = devices?.findIndex((item) => item.address === device.address)
  //     if (index !== -1) {
  //       setDevices(
  //         produce(devices, (draft) => {
  //           draft[index] = device
  //         })
  //       )
  //     }
  //   } catch (error) {}
  // }

  const deviceFoundEvent = (_device: string | BTDeviceRes) => {
    try {
      const device: BTDeviceRes = (_device as BTDeviceRes)?.address
        ? _device
        : JSON.parse(_device as string)

      if (!devices?.some((item) => item.address === device.address)) {
        setDevices([device, ...devices])
      }
    } catch (error) {}
  }

  const requestOpenSetting = () => {
    RAlert.alert(
      'Yêu cầu cấp quyền Bluetooth',
      'Vui lòng cấp quyền truy cập Bluetooth cho ứng dụng',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        { text: 'Xác nhận', onPress: async () => await Linking.openSettings() },
      ]
    )
  }

  const requestOpenBluetooth = (cb?: () => void) => {
    BluetoothStateManager.requestToEnable()
      .then(() => cb?.())
      .catch(() => {
        Toast.show({ text1: 'Vui lòng bật bluetooth để sử dụng tính năng này', type: 'error' })
      })
  }

  async function requestBluetoothPermission(cb?: () => void) {
    try {
      const bluetoothConnectGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      )

      if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const bluetoothScanGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        )
        if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
          cb?.()
          setHasPermission(true)
        } else {
          requestOpenSetting()
        }
      } else {
        requestOpenSetting()
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const connect = async (device: BTDeviceRes) => {
    setBackdropVisible(true)
    try {
      if (bluetoothDevice?.address) {
        await BluetoothManager.unpaire(device)
      }
      await BluetoothManager.connect(device.address)
      setBackdropVisible(false)
      setBluetoothDevice(device)
    } catch (error) {
      Toast.show({ text1: 'Không thể kết nối đến thiết bị', type: 'error' })
      setBackdropVisible(false)
    }
  }

  const unPair = async (address: string) => {
    setBackdropVisible(true)
    try {
      await BluetoothManager.unpaire(address)
      setBackdropVisible(false)
      setBluetoothDevice(undefined)
    } catch (error) {
      Toast.show({ text1: 'Không thể ngắt kết nối thiết bị', type: 'error' })
      setBackdropVisible(false)
    }
  }

  const scanDevices = async () => {
    if (isFinding) return

    requestBluetoothPermission(async () => {
      const res = await BluetoothStateManager.getState()
      const btStatus = res === 'PoweredOn'
      setIsActiveBluetooth(btStatus)
      if (!btStatus) {
        requestOpenBluetooth(() => scanDevices())
        return
      }

      setIsFinding(true)
      try {
        const res: string = await BluetoothManager.scanDevices()
        const response: ScanDeviceRes = JSON.parse(res)
        const founds = [...(response?.found || [])]?.filter((item) => item?.name)
        const paireds = [...(response?.paired || [])]?.filter((item) => item?.name)
        setIsFinding(false)
        setDevices(_.uniqBy([...founds, ...paireds], 'address'))
      } catch (error) {
        setIsFinding(false)
      }
    })
  }

  return {
    devices,
    isActiveBluetooth,
    bluetoothDevice,
    isFinding,
    hasPermission,
    connect,
    unPair,
    scanDevices,
    print,
  }
}
