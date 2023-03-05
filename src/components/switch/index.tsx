import { COLORS } from '@/theme'
import React, { useState } from 'react'
import { Switch as RSwitch, SwitchProps as RSwitchProps } from 'react-native'

type SwitchProps = Omit<RSwitchProps, 'onChange'> & {
  value?: boolean
  onChange?: (val: boolean) => void
}

export const Switch = ({ onChange, value = false, ...attributes }: SwitchProps) => {
  const [val, setVal] = useState<boolean>(value)

  return (
    <RSwitch
      value={value}
      trackColor={{ false: COLORS.gray40, true: COLORS.active }}
      thumbColor={COLORS.gray20}
      onChange={() => {
        setVal(!val)
        onChange?.(!val)
      }}
      {...attributes}
    />
  )
}
