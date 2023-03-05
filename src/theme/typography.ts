import { StyleSheet } from 'react-native'
import { COLORS } from './color'

export const TYPOGRAPHY = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Nunito-Bold',
    color: COLORS.gray95,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Nunito-Black',
    fontWeight: '700',
    color: COLORS.textBody,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    lineHeight: 24,
    color: COLORS.textBody,
  },
  topBarTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    lineHeight: 24,
    color: COLORS.textBody,
    fontWeight: '600',
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Nunito-Medium',
    color: COLORS.textBody,
  },
  smSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textBody,
    fontFamily: 'Nunito-SemiBold',
  },
  smNormal: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray50,
    fontFamily: 'Nunito-Regular',
  },
  smBold: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textBody,
    fontFamily: 'Nunito-Bold',
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Nunito-Medium',
    color: COLORS.gray95,
  },
  baseBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Nunito-Bold',
    color: COLORS.gray95,
  },
  baseSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Nunito-SemiBold',
    color: COLORS.gray95,
  },
  baseNormal: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Nunito-Regular',
    color: COLORS.gray50,
  },
  xs: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Nunito-Medium',
    color: COLORS.gray95,
  },
  xsNormal: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Nunito-Regular',
    color: COLORS.gray50,
  },
  errorInputText: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.error,
    fontFamily: 'Nunito-Regular',
  },
  input: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.gray95,
    fontFamily: 'Nunito-Regular',
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 18,
    color: COLORS.textBody,
    fontFamily: 'Nunito-Bold',
  },
  textButton: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
    fontFamily: 'Nunito-Bold',
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Nunito-Regular',
    color: COLORS.gray60,
  },
})
