import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...TYPOGRAPHY.baseSemiBold,
    marginBottom: 4,
  },
  headerInfoPhone: {
    ...TYPOGRAPHY.xs,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
  productHeader: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    marginBottom: -4,
    marginTop: 24,
  },
})
