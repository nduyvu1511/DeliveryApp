import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  userName: {
    ...TYPOGRAPHY.baseSemiBold,
  },
  separate: {
    ...COMMON_STYLES.separateDashed,
    marginVertical: 16,
  },
  status: {
    ...TYPOGRAPHY.xsNormal,
  },
  avatar: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 50,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 12,
  },
  line: {
    width: '80%',
    height: 12,
    borderRadius: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
})
