import { deliveryAPI } from '@/services'
import Geolocation from '@react-native-community/geolocation'
import ReactNativeForegroundService from '@supersami/rn-foreground-service'
import { useState } from 'react'
import { useEffect } from 'react'
import { getBatteryLevelSync } from 'react-native-device-info'

ReactNativeForegroundService.register()

export const useForegroundLocation = () => {
  const [isRunning, setRunning] = useState<boolean>(
    ReactNativeForegroundService.is_running() || false
  )

  useEffect(() => {
    ReactNativeForegroundService.add_task(trackingLocation, {
      delay: 10000,
      onLoop: true,
      taskId: 'taskid',
      onError: (e) => console.log(`Error logging:`, e),
    })
  }, [])

  const toggleService = () => {
    const isRunning = ReactNativeForegroundService.is_running()
    setRunning(!isRunning)
    if (isRunning) {
      ReactNativeForegroundService.stopAll()
    } else {
      ReactNativeForegroundService.start({
        id: 1244,
        title: 'Theo dõi hành trình',
        message: 'Đang cập nhật vị trí của bạn lên hệ thống',
        icon: 'ic_launcher',
        // button: true,
        buttonText: 'Kết thúc theo dõi hành trình',
        buttonOnPress: 'cray',
        color: '#000000',
      })
    }
  }

  const trackingLocation = async () => {
    Geolocation.getCurrentPosition(({ coords, timestamp }) => {
      const newCoordinate = { latitude: coords.latitude, longitude: coords.longitude }
      deliveryAPI
        .traccarTrackingLocation({
          id: '123456789',
          lat: newCoordinate.latitude,
          lon: newCoordinate.longitude,
          accuracy: coords.accuracy,
          altitude: coords?.altitude || 0,
          batt: getBatteryLevelSync() * 100,
          timestamp,
          speed: coords?.speed || 0,
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  return {
    toggleService,
    isRunning,
  }
}
