import { COLORS, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.black50,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  draggableIcon: {
    marginBottom: 0,
    backgroundColor: COLORS.gray50,
    height: 3,
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  header: {
    padding: 16,
    borderBottomColor: COLORS.borderColor1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...TYPOGRAPHY.topBarTitle,
    textAlign: 'center',
    flex: 1,
  },
})

export const bottomSHeetStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.black50,
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
})
