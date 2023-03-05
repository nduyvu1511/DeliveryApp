import { COLORS, COMMON_STYLES, SHADOW, SPACING, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: SPACING.topBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  button: {
    ...COMMON_STYLES.flexCenter,
    padding: 8,
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  title: {
    ...TYPOGRAPHY.topBarTitle,
  },
  left: {
    marginRight: 12,
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    marginLeft: 12,
  },
})
