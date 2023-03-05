import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  otpWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpInput: { width: '80%', height: 80 },
  borderStyleHighLighted: {
    borderColor: COLORS.primary,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    ...TYPOGRAPHY.baseSemiBold,
    fontSize: 24,
    lineHeight: 32,
    color: COLORS.primary,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
  footer: {
    ...COMMON_STYLES.flexRowSpaceBetween,
  },
  footerText: {
    ...TYPOGRAPHY.sm,
    color: COLORS.primary,
  },
})
