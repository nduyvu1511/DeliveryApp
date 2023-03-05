import { COMMON_STYLES } from '@/theme'
import React from 'react'
import { Control, useController } from 'react-hook-form'
import { View, ViewStyle } from 'react-native'
import { TextInput, TextInputProps } from '../textInput'

export type TextFieldProps = TextInputProps & {
  control: Control<any>
  name: string
  containerStyle?: ViewStyle
}

export const TextField = ({ control, name, containerStyle, ...attributes }: TextFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <View style={[COMMON_STYLES.inputContainer, containerStyle]}>
      <TextInput
        ref={ref}
        onBlur={onBlur}
        value={value}
        onChangeText={onChange}
        error={error?.message || error?.type}
        {...attributes}
      />
    </View>
  )
}
