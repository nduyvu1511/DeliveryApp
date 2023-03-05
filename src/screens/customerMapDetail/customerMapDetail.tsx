import { Button, MapView } from '@/components'
import { getCurrentLocation, getDirections } from '@/helpers'
import { useCommonSlice } from '@/store'
import { COLORS } from '@/theme'
import { CustomerMapDetailNavigation, StackParamsList } from '@/types'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Platform, View } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { CustomerItem } from './components'

export const CustomerMapDetailScreen = () => {
  const navigation = useNavigation<CustomerMapDetailNavigation>()
  const { params } = useRoute<RouteProp<StackParamsList, 'CustomerMapDetail'>>()
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)

  const handleGetDirections = () => {
    setBackdropVisible(true)
    getCurrentLocation(
      (source) => {
        setBackdropVisible(false)
        getDirections({
          destination: { longitude: +params.longitude, latitude: +params.latitude },
          source,
          params: [],
          waypoints: [],
        })
      },
      () => {
        Toast.show({ type: 'error', text1: 'Không tìm thấy vị trí của bạn' })
        setBackdropVisible(false)
      }
    )
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <MapView
        onBack={() => navigation.goBack()}
        directions={[
          {
            latitude: +params.latitude,
            longitude: +params.longitude,
          },
        ]}
      >
        <BottomSheet
          handleIndicatorStyle={{ backgroundColor: COLORS.gray50 }}
          snapPoints={[150, Platform.OS === 'android' ? 400 : 380]}
        >
          <BottomSheetView>
            <View>
              <CustomerItem
                style={{ shadowColor: 'transparent' }}
                data={params}
                showLocationBtn={false}
              />
              <View style={{ paddingHorizontal: 16 }}>
                <Button onPress={handleGetDirections} title="Xem đường đi" />
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </MapView>
    </View>
  )
}
