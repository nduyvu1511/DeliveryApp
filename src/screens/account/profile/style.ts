import { COLORS, COMMON_STYLES, SHADOW, TYPOGRAPHY } from '@/theme'
import { StyleSheet } from 'react-native'

const USER_BOX_HEIGHT = 112
const HEADER_HEIGHT = 132

export const styles = StyleSheet.create({
  header: {},
  userBox: {
    position: 'relative',
    top: -(USER_BOX_HEIGHT / 2),
    marginHorizontal: 16,
    height: USER_BOX_HEIGHT,
    borderRadius: 16,
    ...SHADOW.element,
    shadowColor: COLORS.gray40,
  },
  bgImg: {
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.bgPrimary,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  headerInfo: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerTitle: {
    ...TYPOGRAPHY.topBarTitle,
  },
  amountBox: {
    ...COMMON_STYLES.flexRowCenter,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.bgPrimary2,
  },
  amountBoxLabel: {
    ...TYPOGRAPHY.xs,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.gray50,
  },
  amountBoxValue: {
    ...TYPOGRAPHY.smBold,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.primary,
  },
  avatar: {},
  phone: {
    ...TYPOGRAPHY.smNormal,
    color: COLORS.gray50,
    marginBottom: 2,
  },
  email: {
    ...TYPOGRAPHY.smNormal,
    color: COLORS.gray50,
  },
  content: {
    flex: 1,
    marginTop: -(HEADER_HEIGHT / 2) + 40,
    backgroundColor: COLORS.white,
  },
  userName: {
    ...TYPOGRAPHY.baseBold,
    lineHeight: 26,
    fontSize: 20,
    marginBottom: 4,
  },

  heading: {
    ...TYPOGRAPHY.baseBold,
    marginHorizontal: 16,
    marginBottom: 4,
  },

  listItem: {
    ...COMMON_STYLES.flexRowSpaceBetween,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  listItemText: {
    ...TYPOGRAPHY.sm,
    color: COLORS.gray60,
  },

  btnLogout: {
    marginHorizontal: 40,
    backgroundColor: COLORS.bgPrimary,
  },
})
