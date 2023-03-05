import { COLORS, COMMON_STYLES } from '@/theme'
import React from 'react'
import {
  Dimensions,
  Modal as ReactModal,
  ModalProps as RModalProps,
  Pressable,
  ViewStyle,
} from 'react-native'
import { styles } from './style'

export type ModalProps = Partial<RModalProps> & {
  children: JSX.Element | JSX.Element[]
  style?: ViewStyle | ViewStyle[]
  height?: number | 'unset'
  fullScreen?: boolean
  allowOverlayPress?: boolean
  visible: boolean
}

const dimensions = Dimensions.get('window').height

export const Modal = ({
  children,
  height = 0.5,
  style,
  fullScreen = false,
  allowOverlayPress = true,
  ...attributes
}: ModalProps) => {
  return (
    <ReactModal
      statusBarTranslucent
      animationType="fade"
      style={styles.overlay}
      transparent
      onRequestClose={() => attributes?.onDismiss?.()}
      {...attributes}
    >
      <Pressable
        onPress={() => allowOverlayPress && attributes?.onDismiss?.()}
        style={{ backgroundColor: COLORS.black50, flex: 1, ...COMMON_STYLES.flexCenter }}
      >
        <Pressable
          style={[
            styles.modal,
            {
              height: height === 'unset' ? undefined : height < 1 ? dimensions * height : height,
            },
            fullScreen && styles.modalFullScreen,
            style,
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </ReactModal>
  )
}
