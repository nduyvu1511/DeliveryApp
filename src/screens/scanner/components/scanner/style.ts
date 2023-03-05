import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

const FOOTER_HEIGHT = 80

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 24,
    left: 16,
    right: 16,
  },
  headerTitle: {
    ...TYPOGRAPHY.sm,
    color: COLORS.white,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  overlay: {
    ...COMMON_STYLES.absoluteInset,
    ...COMMON_STYLES.flexCenter,
  },
  qrImage: {
    maxWidth: 250,
    maxHeight: 250,
    width: '100%',
    height: '100%',
  },
  btn: {
    ...COMMON_STYLES.flexCenter,
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    zIndex: 10,
  },
  backBtn: {
    top: 48,
    left: 16,
  },
  flashBtn: {
    width: 40,
    height: 40,
    bottom: 24,
    right: 24,
  },
  footer: {
    backgroundColor: COLORS.white,
    width: '100%',
    flexDirection: 'row',
    height: FOOTER_HEIGHT,
  },
  loading: {
    ...COMMON_STYLES.absoluteInset,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...TYPOGRAPHY.base,
    color: COLORS.white,
  },
  footerBtn: {
    ...COMMON_STYLES.flexCenter,
    flex: 1,
  },
  footerBtnLabel: {
    ...TYPOGRAPHY.xs,
    marginTop: 8,
  },
})
