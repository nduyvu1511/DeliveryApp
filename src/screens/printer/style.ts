import { COLORS, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  containerList: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    flex: 1,
  },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  deviceNotFound: {
    ...TYPOGRAPHY.sm,
    marginBottom: 16,
  },
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { ...TYPOGRAPHY.baseSemiBold, marginBottom: 12 },
  printerInfo: {
    ...TYPOGRAPHY.sm,
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 16,
  },
})
