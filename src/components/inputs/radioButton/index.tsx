import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React, { useState } from 'react'
import { Text, View, ViewStyle } from 'react-native'
import RadioForm, {
  RadioButton as RadioButtonLib,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'

export interface RadioButtonProps {
  style?: ViewStyle | ViewStyle[]
  label?: string
  required?: boolean
  data: { label: string; value: string | number }[]
  value?: string | number
  buttonStyle?: ViewStyle | ViewStyle[]
  error?: string
  onChange?: (val: string | number) => void
}

export const RadioButton = ({
  data,
  value: valueProps,
  label,
  required,
  style,
  buttonStyle,
  error,
  onChange,
}: RadioButtonProps) => {
  const [value, setValue] = useState<string | number | undefined>(valueProps)

  const onPress = (val: number | string) => {
    setValue(val)
    onChange?.(val)
  }

  return (
    <View style={style}>
      {label ? (
        <Text style={[TYPOGRAPHY.baseBold, { marginBottom: 8 }]}>
          {label}
          {required ? <Text style={[TYPOGRAPHY.smBold, { color: COLORS.red }]}> *</Text> : null}
        </Text>
      ) : null}

      <RadioForm formHorizontal>
        {data.map((obj, i) => (
          <RadioButtonLib key={i} style={{ marginRight: 40 }}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={value === obj.value}
              onPress={onPress}
              buttonInnerColor={COLORS.primary}
              buttonOuterColor={value === obj.value ? COLORS.active : COLORS.gray50}
              buttonSize={11}
              buttonOuterSize={20}
              buttonStyle={[{ borderWidth: 1.5 }, buttonStyle]}
            />

            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={onPress}
              labelStyle={TYPOGRAPHY.sm}
              labelWrapStyle={{}}
            />
          </RadioButtonLib>
        ))}
      </RadioForm>

      {error ? (
        <Text style={COMMON_STYLES.inputErrorText}>{error || 'Đây là một trường bắt buộc'}</Text>
      ) : null}
    </View>
  )
}
