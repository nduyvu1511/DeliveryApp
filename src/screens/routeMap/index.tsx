import { MapView } from '@/components'
import { HomeNavigation, RouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const RouteMapScreen = () => {
  const navigation = useNavigation<HomeNavigation>()

  const generateDirections = (data: RouteRes[]) => {
    if (!data) return []

    // return data.map(item => )
  }

  return <MapView />
}
