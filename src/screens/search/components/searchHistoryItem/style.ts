import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
  container: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gray10,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  contentText: {
    ...TYPOGRAPHY.sm,
    marginLeft: 12,
  },
  deleteBtn: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    zIndex: 100,
  },
})
