import { ArrowLeftIcon, CurrentLocationIcon } from '@/assets'
import { CONFIG } from '@/constants'
import { getCurrentLocation } from '@/helpers'
import { COLORS } from '@/theme'
import { LngLat } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Linking, View, ViewStyle } from 'react-native'
import RMapView, {
  MapMarker,
  MapViewProps as LibMapViewProps,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Toast from 'react-native-toast-message'
import { IconButton } from '../button'
import { styles } from './style'
import { SafeAreaView } from 'react-native-safe-area-context'

interface MapViewProps extends LibMapViewProps {
  onBack?: Function
  directions?: LngLat[]
  showCurrentLocationBtn?: boolean
  children?: JSX.Element | JSX.Element[] | null
  currentLocationBtnStyle?: ViewStyle | ViewStyle[]
}

const LATITUDE = 10.7717269
const LONGITUDE = 106.7428548
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = 0.01

export const MapView = ({
  onBack,
  directions,
  showCurrentLocationBtn = true,
  children = null,
  ...attributes
}: MapViewProps) => {
  const navigation = useNavigation()
  const ref = useRef<RMapView>(null)
  const markerRef = useRef<MapMarker>(null)
  const [currentLocation, setCurrentLocation] = useState<LngLat>({
    latitude: LATITUDE,
    longitude: LONGITUDE,
  })

  useEffect(() => {
    handleGetCurrentLocation()
  }, [])

  const handleGetCurrentLocation = useCallback(() => {
    getCurrentLocation(
      (location) => {
        setCurrentLocation(location)
        ref.current?.animateToRegion({
          ...location,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
      },
      async () => {
        Toast.show({ text1: 'Không tìm thấy vị trí của bạn', type: 'error' })
        await Linking.openSettings()
      }
    )
  }, [])

  const panToCurrentLocation = () => {
    if (!currentLocation?.latitude) {
      handleGetCurrentLocation()
      return
    }

    ref.current?.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  }

  return (
    <>
      <SafeAreaView edges={['left', 'right']} style={styles.container}>
        <View style={styles.header}>
          <IconButton
            size={40}
            style={styles.backButton}
            onPress={() => (onBack ? onBack() : navigation.goBack())}
            icon={<ArrowLeftIcon />}
          />

          <IconButton
            size={40}
            style={styles.locationBtn}
            onPress={panToCurrentLocation}
            icon={<CurrentLocationIcon />}
          />
        </View>

        <RMapView
          ref={ref}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          {...attributes}
        >
          {directions?.length
            ? directions?.map((item, index) => (
                <View key={index}>
                  <Marker coordinate={item} />
                  <MapViewDirections
                    optimizeWaypoints
                    strokeColor={COLORS.directionStroke}
                    strokeWidth={6}
                    language="vi"
                    origin={currentLocation}
                    precision="high"
                    destination={item}
                    apikey={CONFIG.googleMapKey}
                  />
                </View>
              ))
            : null}

          {currentLocation ? <Marker ref={markerRef} coordinate={currentLocation} /> : null}
        </RMapView>

        {children}
      </SafeAreaView>
    </>
  )
}
