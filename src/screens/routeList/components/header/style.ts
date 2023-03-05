import { COLORS, COMMON_STYLES, SHADOW, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

const INPUT_HEIGHT = 48
const HEADER_HEIGHT = 120

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    height: HEADER_HEIGHT,
  },
  header: {
    position: 'relative',
    height: HEADER_HEIGHT,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: COLORS.bgPrimary,
  },
  headerNotificationDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    right: 0,
    top: 0,
    borderRadius: 50,
    backgroundColor: COLORS.red,
  },
  headerRight: {
    ...COMMON_STYLES.flexRowCenter,
  },
  headerInner: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    position: 'relative',
    top: HEADER_HEIGHT / 4,
  },
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  headerAvatar: {
    marginRight: 12,
  },
  headerTitle: {
    ...TYPOGRAPHY.baseBold,
  },
  headerDesc: {
    ...TYPOGRAPHY.xs,
    color: COLORS.gray50,
  },
  searchContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 10,
    height: INPUT_HEIGHT,
    bottom: INPUT_HEIGHT / 2,
    ...SHADOW.element,
  },
})
