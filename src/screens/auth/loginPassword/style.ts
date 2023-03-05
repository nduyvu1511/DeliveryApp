import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.container,
    paddingBottom: 16,
    flex: 1,
  },
  phoneText: { ...TYPOGRAPHY.smSemiBold, color: COLORS.primary },
  footer: {
    ...COMMON_STYLES.flexRowSpaceBetween,
  },
  footerBtn: {
    padding: 4,
  },
  footerLabel: { ...TYPOGRAPHY.sm, color: COLORS.primary },
})
