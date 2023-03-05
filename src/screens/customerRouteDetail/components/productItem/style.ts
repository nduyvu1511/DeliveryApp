import { COLORS, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  contentName: {
    ...TYPOGRAPHY.baseSemiBold,
    marginBottom: 8,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contentText: {
    ...TYPOGRAPHY.xs,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  contentMoneyText: {
    ...TYPOGRAPHY.smBold,
    color: COLORS.red,
  },
})
