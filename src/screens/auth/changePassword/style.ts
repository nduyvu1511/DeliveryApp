import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: { paddingHorizontal: SPACING.container },
  phoneText: { ...TYPOGRAPHY.smSemiBold, color: COLORS.primary },
  footer: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    paddingVertical: 24,
    paddingHorizontal: SPACING.container,
  },
  footerLabel: { ...TYPOGRAPHY.sm, color: COLORS.primary },
})
