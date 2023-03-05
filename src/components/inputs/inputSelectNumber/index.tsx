import { Modal, SelectNumber, SelectNumberProps } from '@/components'
import { formatMoneyVND } from '@/helpers'
import { useModal } from '@/hooks'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React from 'react'
import { Pressable, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import { styles } from './style'

type InputSelectNumberProps = Omit<SelectNumberProps, 'visible'> & {
  readOnly?: boolean
  style?: ViewStyle | ViewStyle[]
  label?: string
  inputStyle?: ViewStyle | ViewStyle[]
  labelStyle?: TextStyle | TextStyle[]
}

export const InputSelectNumber = ({
  inputStyle,
  labelStyle,
  style,
  readOnly = false,
  label,
  ...attributes
}: InputSelectNumberProps) => {
  const { visible, onClose, onOpen } = useModal()

  const displayValue = (): string => {
    if (attributes?.type === 'money') return formatMoneyVND(attributes?.value || 0)

    return (attributes?.value || 0) + ''
  }

  return (
    <>
      <View style={[COMMON_STYLES.flexRowSpaceBetween, style]}>
        <Text style={[TYPOGRAPHY.smNormal, labelStyle]}>{attributes?.title}</Text>

        <Pressable
          style={{ opacity: readOnly ? 0.5 : 1 }}
          pointerEvents={readOnly ? 'none' : 'auto'}
          onPress={onOpen}
        >
          <TextInput
            pointerEvents="none"
            value={displayValue()}
            textAlign="right"
            style={[styles.input, inputStyle]}
            editable={false}
          />
        </Pressable>
      </View>

      <Modal
        onDismiss={onClose}
        visible={visible}
        style={{ width: 320, maxHeight: 370, height: '100%' }}
      >
        <SelectNumber {...attributes} onDismiss={onClose} />
      </Modal>
    </>
  )
}
