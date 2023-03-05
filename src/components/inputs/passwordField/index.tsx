import { COLORS, COMMON_STYLES } from '@/theme'
import React from 'react'
import { Control, useController } from 'react-hook-form'
import { View, ViewStyle, TextInput as RTextInput } from 'react-native'
import { PasswordInput } from '../passwordInput'
import { TextInputProps } from '../textInput'

export type PasswordFieldProps = TextInputProps & {
  control: Control<any>
  name: string
  containerStyle?: ViewStyle
}

export const PasswordField = ({
  control,
  name,
  containerStyle,
  ...attributes
}: PasswordFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <View style={[COMMON_STYLES.inputContainer, containerStyle]}>
      <PasswordInput
        ref={ref}
        onBlur={onBlur}
        value={value}
        onChangeText={onChange}
        error={error?.message}
        {...attributes}
      />
    </View>
  )
}
