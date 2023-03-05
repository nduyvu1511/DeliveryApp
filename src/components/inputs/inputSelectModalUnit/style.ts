import { COLORS, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  input: {
    ...TYPOGRAPHY.smSemiBold,
    backgroundColor: COLORS.gray10,
    borderRadius: 5,
    marginLeft: 16,
    height: 32,
    width: 120,
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'auto',
  },
  text: {
    ...TYPOGRAPHY.baseSemiBold,
    textAlign: 'right',
  },
})
