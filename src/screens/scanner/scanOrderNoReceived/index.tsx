import React from 'react'
import { View } from 'react-native'
import { Scanner } from '../components'

export const ScanOrderNoReceivedScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Scanner type="searchOrderNotReceived" />
    </View>
  )
}
