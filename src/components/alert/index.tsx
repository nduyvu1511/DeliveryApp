import { ErrorIcon, SuccessIcon, WarningIcon } from '@/assets'
import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '@/theme'
import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../button'
import { Modal, ModalProps } from '../modal'
import { alertStyles } from './style'

type AlertProps = Omit<ModalProps, 'children'> & {
  title?: string
  desc?: string
  type?: 'success' | 'warning' | 'error' | 'info'
  leftBtnTitle?: string
  rightBtnTitle?: string
  onLeftBtnPress?: Function
  onRightBtnPress?: Function
  allowOverlayPress?: boolean
} 

export const Alert = ({
  desc,
  title,
  type = 'success',
  onLeftBtnPress,
  leftBtnTitle,
  rightBtnTitle,
  onRightBtnPress,
  allowOverlayPress = true,
  ...attributes
}: AlertProps) => {
  const getIcon = useCallback(
    (size: number): JSX.Element => {
      if (type === 'error') return <ErrorIcon size={size} />
      if (type === 'success') return <SuccessIcon size={size} />
      if (type === 'info') return <WarningIcon fill={COLORS.info} size={size} />
      return <WarningIcon size={size} />
    },
    [type]
  )

  return (
    <Modal
      allowOverlayPress={allowOverlayPress}
      height="unset"
      style={{ maxWidth: SPACING.alertWidth, width: '100%' }}
      {...attributes}
    >
      <View style={alertStyles.alert}>
        <View style={{ marginBottom: 16 }}>{getIcon(80)}</View>

        {title ? (
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{
                ...TYPOGRAPHY.title,
                fontSize: 18,
                textTransform: 'none',
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
          </View>
        ) : null}

        {desc ? (
          <View style={{ marginBottom: 24 }}>
            <Text numberOfLines={3} style={[TYPOGRAPHY.base, { textAlign: 'center' }]}>
              {desc}
            </Text>
          </View>
        ) : null}

        <View style={{ ...COMMON_STYLES.flexRowSpaceBetween }}>
          {onLeftBtnPress ? (
            <Button
              onPress={() => {
                attributes?.onDismiss?.()
                onLeftBtnPress?.()
              }}
              style={{ marginRight: 16, flex: 1 }}
              textStyle={{ fontSize: 14 }}
              title={`${leftBtnTitle || 'Quay lại'}`}
              type="secondary"
            />
          ) : null}

          {onRightBtnPress ? (
            <Button
              onPress={() => {
                attributes?.onDismiss?.()
                onRightBtnPress?.()
              }}
              style={{ flex: 1 }}
              textStyle={{ fontSize: 14 }}
              title={`${rightBtnTitle || 'Xác nhận'}`}
              type={type}
            />
          ) : null}
        </View>
      </View>
    </Modal>
  )
}
