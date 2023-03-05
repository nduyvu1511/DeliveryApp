import { useCommonSlice } from '@/store'
import { COLORS, COMMON_STYLES } from '@/theme'
import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, Modal, View } from 'react-native'

interface BackdropProps extends ActivityIndicatorProps {}

export const Backdrop = ({ ...attributes }: BackdropProps) => {
  const backdropVisible = useCommonSlice((state) => state.backdropVisible)

  return (
    <Modal
      style={{ flex: 1, ...COMMON_STYLES.flexCenter }}
      statusBarTranslucent
      transparent
      visible={backdropVisible}
    >
      <View style={{ flex: 1, backgroundColor: COLORS.black50, ...COMMON_STYLES.flexCenter }}>
        <ActivityIndicator size={'large'} color={COLORS.white} {...attributes} />
      </View>
    </Modal>
  )
}
