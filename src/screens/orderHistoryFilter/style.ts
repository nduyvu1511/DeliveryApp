import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  warpper: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingVertical: 16,
  },
  title: {
    ...TYPOGRAPHY.baseBold,
    marginBottom: 8,
  },
  footer: {
    ...COMMON_STYLES.buttonBottom,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: COLORS.bgPrimaryLight,
  },
})
