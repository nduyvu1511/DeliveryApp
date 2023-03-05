import { TYPOGRAPHY } from '@/theme'
import React from 'react'
import { Text, View, ViewStyle } from 'react-native'

interface StatusBadgeProps {
  title: string
  color?: string
  bg?: string
  style?: ViewStyle | ViewStyle[]
}

export const StatusBadge = ({ bg, color, title, style }: StatusBadgeProps) => {
  return (
    <View
      style={[
        {
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: bg,
          borderRadius: 8,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={{
          ...TYPOGRAPHY.xsNormal,
          color: color,
        }}
      >
        {title}
      </Text>
    </View>
  )
}
