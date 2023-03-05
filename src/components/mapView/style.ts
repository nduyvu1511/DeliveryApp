import { COLORS, COMMON_STYLES, SHADOW, TYPOGRAPHY } from '@/theme'
import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 36,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    zIndex: 1001,
  },
  switchLabel: {
    ...TYPOGRAPHY.xs,
  },
  backButton: {
    ...SHADOW.button,
  },
  backdrop: {
    ...COMMON_STYLES.flexCenter,
    ...COMMON_STYLES.absoluteInset,
    zIndex: 1000,
    backgroundColor: COLORS.black50,
  },
  locationBtn: {
    backgroundColor: COLORS.white,
    ...SHADOW.button,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
