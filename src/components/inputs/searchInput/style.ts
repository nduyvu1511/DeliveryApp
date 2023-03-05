import { COLORS, COMMON_STYLES, SPACING, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputContainer: {
    ...COMMON_STYLES.flexRowCenter,
    width: '100%',
    height: 48,
    backgroundColor: COLORS.white98,
    borderRadius: SPACING.borderRadius,
    paddingHorizontal: SPACING.lg,
  },
  inputWrapper: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    ...TYPOGRAPHY.sm,
  },
  input: {
    ...TYPOGRAPHY.input,
    fontSize: 13,
    lineHeight: 18,
    height: '100%',
    textAlignVertical: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcons: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
