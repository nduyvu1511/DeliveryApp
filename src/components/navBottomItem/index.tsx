import React from 'react'
import { Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '../../theme'

type IconProps = {
  fill?: string
  size?: number
}

interface NavBottomItemProps {
  label: string
  active?: boolean
  RenderIcon: (_: IconProps) => JSX.Element
  onPress?: () => void
}

export const NavBottomItem = ({
  label,
  active = false,
  onPress,
  RenderIcon,
}: NavBottomItemProps) => {
  if (label === '') {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress} style={styles.mapBtn}>
          <RenderIcon size={24} fill={COLORS.white} />
        </Pressable>
      </View>
    )
  }

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(COLORS.gray30, true)}
    >
      <View style={styles.container}>
        <RenderIcon fill={active ? COLORS.primary : COLORS.gray50} size={24} />

        <Text
          numberOfLines={1}
          style={[
            TYPOGRAPHY.xs,
            { fontSize: 11, marginTop: 2, color: active ? COLORS.primary : COLORS.gray50 },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    ...COMMON_STYLES.flexCenter,
    flex: 1,
    width: '100%',
    height: SPACING.bottomNavHeight,
    padding: 8,
  },
  mapBtn: {
    ...COMMON_STYLES.flexCenter,
    width: 52,
    height: 52,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.gray50,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 10,
  },
})
