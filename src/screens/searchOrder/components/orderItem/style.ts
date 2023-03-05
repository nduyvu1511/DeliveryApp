import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {},
  header: {
    ...COMMON_STYLES.flexRowCenter,
    marginBottom: 12,
  },
  headerText: {
    ...TYPOGRAPHY.baseSemiBold,
    flex: 1,
    marginLeft: 12,
  },
  content: {},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
})
