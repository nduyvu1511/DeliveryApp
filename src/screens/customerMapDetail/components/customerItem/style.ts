import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {},
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightBtn: {
    ...COMMON_STYLES.flexCenter,
    marginLeft: 12,
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
  },
  headerInfo: {
    flex: 1,
  },
  headerAvatar: {
    marginRight: 12,
  },
  headerInfoName: {
    ...TYPOGRAPHY.baseSemiBold,
    marginBottom: 4,
  },
  headerInfoPhone: {
    ...TYPOGRAPHY.sm,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
})
