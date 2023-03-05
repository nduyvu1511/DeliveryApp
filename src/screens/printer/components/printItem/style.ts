import { TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {},
  inner: { flexDirection: 'row', alignItems: 'center' },
  label: { ...TYPOGRAPHY.smSemiBold, marginLeft: 12, flex: 1 },
  connected: { fontWeight: 'bold', color: '#00BCD4' },
})
