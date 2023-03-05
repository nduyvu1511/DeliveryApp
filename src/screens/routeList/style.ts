import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { paddingTop: 0, backgroundColor: COLORS.bg, flex: 1 },
  title: { ...TYPOGRAPHY.title, marginBottom: -4 },
  titleArea: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    paddingHorizontal: 16,
  },
  filter: {},
})
