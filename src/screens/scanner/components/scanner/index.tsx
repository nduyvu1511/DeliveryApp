import { FlashFillIcon, FlashIcon, qrCodeFrame } from '@/assets'
import { Alert, EmptyRecord, Spinner, TabBar } from '@/components'
import { useAsync, useModal, useScreenRemove } from '@/hooks'
import { deliveryAPI } from '@/services'
import { COLORS } from '@/theme'
import { DeliveryDraftRes, HomeNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert as RAlert, Image, Linking, Pressable, Text, View } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera'
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner'
import { styles } from './style'

interface ScannerProps {
  type?: 'searchOrderNotReceived' | 'searchOrderReceived' | 'searchDeliveryReceived'
}

export const Scanner = ({ type }: ScannerProps) => {
  const navigation = useNavigation<HomeNavigation>()
  const ref = useRef<Camera>(null)
  const devices = useCameraDevices()
  const device = devices.back

  const { asyncHandler } = useAsync()
  const { onClose, onOpen, visible } = useModal()
  const [hasPermission, setHasPermission] = useState(false)
  const [isActiveCamera, setIsActiveCamera] = useState<boolean>(true)
  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off')
  const shouldFetch = useRef<boolean>(true)

  useScreenRemove(() => handleSetActiveCamera(false))

  useEffect(() => {
    requestCameraPermission()
  }, [])

  async function requestCameraPermission() {
    try {
      const permission = await Camera.requestCameraPermission()
      setHasPermission(permission === 'authorized')

      if (permission === 'denied') {
        RAlert.alert(
          'Yêu cầu cấp quyền camera',
          'Vui lòng cấp quyền truy cập camera cho ứng dụng',
          [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            { text: 'Xác nhận', onPress: async () => await Linking.openSettings() },
          ]
        )
      }
    } catch (error) {}
  }

  const handleSetActiveCamera = (status: boolean) => {
    if (status) {
      setIsActiveCamera(true)
      shouldFetch.current = true
    } else {
      setIsActiveCamera(false)
      shouldFetch.current = false
    }
  }

  const closeAlert = () => {
    onClose()
    handleSetActiveCamera(true)
  }

  const openAlert = () => {
    onOpen()
    handleSetActiveCamera(false)
  }

  const navigateToOrderDetail = (data: DeliveryDraftRes) => {
    if (type === 'searchOrderNotReceived') {
      navigation.replace('OrderSearchDetail', {
        delivery_route_id: data.id,
        order_code: data.order_code,
      })
    } else if (type === 'searchOrderReceived') {
      navigation.replace('CustomerOrderDetail', {
        delivery_route_id: data.id,
        order_code: data.order_code,
        customer_id: data?.customer?.customer_id,
        customer_name: data?.customer?.customer_name,
        export_stock_order_id: data?.id,
        route_name: data?.order_name,
        screen: 'ScanOrderReceived',
      })
    } else if (type === 'searchDeliveryReceived') {
      navigation.replace('CustomerOrderDetail', {
        delivery_route_id: data.id,
        order_code: data.order_code,
        customer_id: data.customer?.customer_id,
        customer_name: data?.customer?.customer_name,
        export_stock_order_id: data.id,
        route_name: data.order_name,
        screen: 'SearchDeliveryReceived',
      })
    }
  }

  const handleScanOrder = (delivery_route_code: string) => {
    if (!type || !isActiveCamera || shouldFetch.current === false) return

    handleSetActiveCamera(false)

    asyncHandler({
      fetcher:
        type === 'searchOrderNotReceived'
          ? deliveryAPI.searchDeliveryDraft({ delivery_route_code, limit: 1 })
          : type === 'searchOrderReceived'
          ? deliveryAPI.searchDeliveryDraftReceived({ delivery_route_code, limit: 1 })
          : deliveryAPI.searchDeliveryReceived({ delivery_route_code, limit: 1 }),
      onSuccess: (res) => {
        const data = res?.[0]
        if (!data?.id) {
          openAlert()
        } else {
          navigateToOrderDetail(data)
        }
      },
      onError: openAlert,
      config: {
        showSuccessMsg: false,
        showErrorMsg: false,
      },
    })
  }

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'

    if (!isActiveCamera) return

    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13], {
      checkInverted: true,
    })

    const value = detectedBarcodes?.[0]?.rawValue

    if (value) {
      runOnJS(handleScanOrder)(value)
    }
  }, [])

  return (
    <>
      <TabBar style={{ backgroundColor: COLORS.white }} title="Quét mã" />

      {!hasPermission ? (
        <EmptyRecord
          title="Vui lòng cấp quyền camera cho ứng dụng"
          titleBtn="Cấp quyền cho ứng dụng"
          onBtnPress={async () => await Linking.openSettings()}
        />
      ) : !device ? (
        <View style={[styles.container]}>
          <Spinner size={'large'} style={{ marginTop: 48 }} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Di chuyển camera đến mã QR để quét</Text>
            </View>

            <Camera
              ref={ref}
              style={{ flex: 1, width: '100%', height: '100%' }}
              device={device}
              isActive={isActiveCamera}
              enableZoomGesture
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
              focusable
              torch={flashMode}
            />

            <View style={styles.overlay}>
              <Image style={styles.qrImage} source={qrCodeFrame} />
            </View>

            <Pressable
              onPress={() => setFlashMode(flashMode === 'off' ? 'on' : 'off')}
              style={[styles.btn, styles.flashBtn]}
            >
              {flashMode === 'on' ? (
                <FlashFillIcon fill={COLORS.primary} size={18} />
              ) : (
                <FlashIcon size={18} />
              )}
            </Pressable>
          </View>
        </View>
      )}

      <Alert
        visible={visible}
        type="info"
        desc="Không tìm thấy đơn hàng nào"
        onRightBtnPress={closeAlert}
        onDismiss={closeAlert}
        rightBtnTitle="Đóng"
      />
    </>
  )
}
