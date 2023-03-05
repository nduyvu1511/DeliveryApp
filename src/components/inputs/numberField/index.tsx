import { formatMoneyVND } from '@/helpers'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React, { useMemo } from 'react'
import { Control, useController } from 'react-hook-form'
import { Text, View, ViewStyle } from 'react-native'
import { TextInput, TextInputProps } from '../textInput'

type NumericFormatType = 'percentage' | 'currency' | ''

type NumberFieldProps = TextInputProps & {
  control: Control<any>
  name: string
  containerStyle?: ViewStyle | ViewStyle[]
  numericFormat?: NumericFormatType
  maxCurrency?: number
}

export const NumberField = ({
  control,
  name,
  numericFormat,
  containerStyle,
  maxCurrency = 10000000000,
  ...attributes
}: NumberFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (val: string) => {
    if (!val) onChange(undefined)

    if (!numericFormat) {
      onChange(val)
      return
    }

    if (numericFormat === 'percentage') {
      const number = Number(val) || 0
      onChange(number > 100 ? '100' : number + '')
    } else if (numericFormat === 'currency') {
      const number = Number(val?.replace(/,|\s/g, '')) || 0

      if (number > maxCurrency) return

      onChange(number < 0 ? 0 : number + '')
    }
  }

  const displayValue = (): string => {
    if (!value) return ''

    if (numericFormat === 'currency') {
      const number = Number(value?.replace?.(/,|\s/g, '')) || ''
      return formatMoneyVND(number, '')
    }

    return value
  }

  const getPrefix = useMemo(() => {
    if (numericFormat === 'currency') return 'vnđ'
    if (numericFormat === 'percentage') return '%'
    return ''
  }, [])

  return (
    <View ref={ref} style={[COMMON_STYLES.inputWrapper, { flex: 1 }, containerStyle]}>
      <TextInput
        onBlur={onBlur}
        error={error?.message}
        keyboardType="numeric"
        onChangeText={handleChange}
        value={displayValue()}
        rightIcon={
          <View
            style={[
              COMMON_STYLES.inputRightIcon,
              { paddingBottom: 10, justifyContent: 'flex-end' },
            ]}
          >
            <Text style={TYPOGRAPHY.label}>{getPrefix}</Text>
          </View>
        }
        {...attributes}
      />
    </View>
  )
}
