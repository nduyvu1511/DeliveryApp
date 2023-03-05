import { Modal, ModalSelectItem, ModalSelectItemProps } from '@/components'
import { useModal } from '@/hooks'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { IdAndName } from '@/types'
import React from 'react'
import { Pressable, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import { styles } from './style'

type InputSelectUnitPModalrops = ModalSelectItemProps & {
  readOnly?: boolean
  style?: ViewStyle | ViewStyle[]
  inputStyle?: ViewStyle | ViewStyle[]
  labelStyle?: TextStyle | TextStyle[]
  value?: string
  label?: string
}

export const InputSelectModalUnit = ({
  inputStyle,
  labelStyle,
  style,
  readOnly = false,
  value,
  label,
  ...attributes
}: InputSelectUnitPModalrops) => {
  const { visible, onClose, onOpen } = useModal()

  const handleChange = (val: IdAndName) => {
    attributes?.onChange?.(val)
    onClose()
  }

  return (
    <>
      <View style={[COMMON_STYLES.flexRowSpaceBetween, style]}>
        <Text style={[TYPOGRAPHY.smNormal, labelStyle]}>{label}</Text>
        <Pressable
          style={{ opacity: readOnly ? 0.5 : 1 }}
          pointerEvents={readOnly ? 'none' : 'auto'}
          onPress={onOpen}
        >
          <TextInput
            pointerEvents="none"
            value={value}
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
        <ModalSelectItem {...attributes} onChange={handleChange} />
      </Modal>
    </>
  )
}
