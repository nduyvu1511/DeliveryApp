import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    marginBottom: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  headerLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 12,
    flex: 1,
  },
  headerTitle: {
    ...TYPOGRAPHY.baseSemiBold,
    marginLeft: 12,
    flex: 1,
  },
  labelItem: {
    ...TYPOGRAPHY.smNormal,
  },
  moneyInput: {
    minWidth: 120,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: COLORS.gray30,
    borderWidth: 1,
    marginLeft: 10,
  },
  moneyInputText: {
    ...TYPOGRAPHY.baseSemiBold,
  },
})
