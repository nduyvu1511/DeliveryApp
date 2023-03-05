import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  top: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  title: {
    ...TYPOGRAPHY.baseSemiBold,
    marginLeft: 12,
  },
  dateIcon: {
    marginRight: 4,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...TYPOGRAPHY.xs,
    color: COLORS.gray50,
  },
  bottom: {},
  contentText: {
    ...TYPOGRAPHY.sm,
  },
})
