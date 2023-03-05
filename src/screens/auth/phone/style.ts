import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SPACING.container,
    flex: 1,
    paddingTop: 0,
  },
  titleArea: {
    marginBottom: 40,
  },
  title: {
    ...TYPOGRAPHY.base,
    textAlign: 'center',
    fontSize: 18,
  },
  header: {
    height: 200,
    width: '100%',
    ...COMMON_STYLES.flexCenter,
    marginBottom: 12,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  image: {
    height: 100,
    width: '100%',
  },
})
