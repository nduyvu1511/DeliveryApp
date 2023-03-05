import React from 'react'
import { View } from 'react-native'
import { Scanner } from '../components'

export const ScanDeliveryReceivedScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Scanner type="searchDeliveryReceived" />
    </View>
  )
}
