import { COLORS, COMMON_STYLES } from '@/theme'
import { StyleSheet } from 'react-native'

export const alertStyles = StyleSheet.create({
  alert: {
    ...COMMON_STYLES.flexCenter,
    padding: 24,
  },
  overlay: {
    backgroundColor: COLORS.black,
    opacity: 50,
  },
})
