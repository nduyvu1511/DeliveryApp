import { COMMON_STYLES } from '@/theme'
import React from 'react'
import { Control, useController } from 'react-hook-form'
import { View, ViewStyle } from 'react-native'
import { RadioButton, RadioButtonProps } from '../radioButton'

type RadioButtonField = RadioButtonProps & {
  control: Control<any>
  name: string
  containerStyle?: ViewStyle | ViewStyle[]
}

export const RadioButtonField = ({
  control,
  name,
  containerStyle,
  ...attributes
}: RadioButtonField) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <View ref={ref} style={[COMMON_STYLES.inputContainer, containerStyle]}>
      <RadioButton
        {...attributes}
        error={error?.message}
        value={value}
        onChange={(val) => onChange(val)}
      />
    </View>
  )
}
