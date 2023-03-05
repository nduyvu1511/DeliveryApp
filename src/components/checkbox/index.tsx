import { COLORS } from '@/theme'
import RCheckBox, { CheckBoxProps as RCheckBoxProps } from '@react-native-community/checkbox'
import React from 'react'

interface CheckboxProps extends RCheckBoxProps {}

export const Checkbox = ({ ...attributes }: CheckboxProps) => {
  return (
    <RCheckBox
      style={{ padding: 10 }}
      tintColor={COLORS.active}
      onCheckColor={COLORS.active}
      onFillColor={COLORS.active}
      tintColors={{ true: COLORS.active, false: COLORS.gray40 }}
      onTintColor={COLORS.active}
      animationDuration={100}
      {...attributes}
    />
  )
}
