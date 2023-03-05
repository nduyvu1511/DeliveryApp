import { COLORS, COMMON_STYLES } from '@/theme'
import React from 'react'
import { TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from 'react-native'

interface IconButtonProps extends TouchableHighlightProps {
  icon: JSX.Element
  style?: ViewStyle | ViewStyle[]
  size?: number
}

export const IconButton = ({ icon, style, size = 40, ...attributes }: IconButtonProps) => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.gray20}
      style={[COMMON_STYLES.flexCenter, { width: size, height: size, borderRadius: 50 , backgroundColor: COLORS.white}, style]}
      {...attributes}
    >
      <View pointerEvents='none'>{icon}</View>
    </TouchableHighlight>
  )
}
