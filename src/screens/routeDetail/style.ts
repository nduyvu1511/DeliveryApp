import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    ...COMMON_STYLES.screenContainer,
    padding: 0,
  },

  infoItem: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    marginBottom: 16,
  },
  infoItemLabel: {
    ...TYPOGRAPHY.sm,
  },
  infoItemValue: {
    ...TYPOGRAPHY.baseSemiBold,
  },
})
