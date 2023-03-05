import { Spinner } from '@/components'
import { BUTTON_COLORS, COLORS } from '@/theme'
import React from 'react'
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native'
import { buttonStyles } from './style'

export interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean
  title?: string
  icon?: JSX.Element
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  type?: 'primary' | 'warning' | 'error' | 'info' | 'secondary' | 'success' | 'danger'
  mode?: 'outline' | 'contained'
}

export const Button = ({
  title,
  icon,
  style,
  type = 'primary',
  loading = false,
  textStyle,
  mode = 'contained',
  ...attributes
}: ButtonProps) => {
  const iconStyle = title ? { marginRight: 8 } : {}

  return (
    <TouchableOpacity
      disabled={attributes?.disabled || loading}
      activeOpacity={0.8}
      style={[
        buttonStyles.button,
        mode === 'contained'
          ? { backgroundColor: BUTTON_COLORS[type].bg }
          : {
              borderColor: BUTTON_COLORS[type].color,
              borderWidth: 1,
              backgroundColor: COLORS.white,
            },
        attributes?.disabled && buttonStyles.buttonDisabled,
        loading && buttonStyles.buttonLoading,
        style,
      ]}
      {...attributes}
      onPress={(e) => !loading && !attributes.disabled && attributes?.onPress?.(e)}
    >
      <>
        {loading ? (
          <Spinner containerStyle={iconStyle} size="small" color={COLORS.white} />
        ) : icon ? (
          <View style={iconStyle}>{icon}</View>
        ) : null}

        {title ? (
          <Text style={[buttonStyles.text, { color: BUTTON_COLORS[type].color }, textStyle]}>
            {title}
          </Text>
        ) : null}
      </>
    </TouchableOpacity>
  )
}
