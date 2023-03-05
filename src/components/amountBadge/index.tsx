import { WalletIcon } from '@/assets'
import { formatMoneyVND } from '@/helpers'
import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'

type AmountBadge = {
  value: number
  title?: string
  style?: ViewStyle | ViewStyle[]
}

export const AmountBadge = ({ value, style, title = 'Tổng tiền hàng' }: AmountBadge) => {
  return (
    <View style={[styles.amountBox, style]}>
      <WalletIcon fill={COLORS.primary} />
      <View style={{ marginLeft: 4 }}>
        <Text style={styles.amountBoxLabel}>{title}</Text>
        <Text style={styles.amountBoxValue}>{formatMoneyVND(value)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  amountBox: {
    ...COMMON_STYLES.flexRowCenter,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: COLORS.bgPrimary2,
  },
  amountBoxLabel: {
    ...TYPOGRAPHY.xs,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.gray50,
  },
  amountBoxValue: {
    ...TYPOGRAPHY.smBold,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.primary,
  },
})
