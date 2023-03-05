import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  headerInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRightBtn: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    ...COMMON_STYLES.flexCenter,
  },
  headerInfo: { flex: 1 },
  headerAvatar: {
    marginRight: 12,
  },
  headerInfoName: {
    ...TYPOGRAPHY.baseBold,
    marginBottom: 4,
  },
  headerInfoPhone: {
    ...TYPOGRAPHY.smNormal,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
  productHeader: { ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: 8, paddingRight: 18 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
})
