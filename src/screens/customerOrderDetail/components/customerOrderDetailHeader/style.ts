import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  infoElement: {
    marginBottom: 24,
  },
  listItem: {
    marginBottom: 12,
  },
  seeMoreBtn: {
    ...COMMON_STYLES.flexRowCenter,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  seeMoreBtnTitle: {
    ...TYPOGRAPHY.sm,
    color: COLORS.gray50,
    marginRight: 4,
  },
})
