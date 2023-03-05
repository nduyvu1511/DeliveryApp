import { COLORS, TYPOGRAPHY } from '@/theme'
import { default as React } from 'react'
import { StyleSheet } from 'react-native'
import RToast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
  ToastProps as RToastProps,
} from 'react-native-toast-message'

interface ToastProps extends RToastProps {}

export const Toast = ({ ...attributes }: ToastProps) => {
  const toastConfig: ToastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLORS.success, height: 48 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={styles.text1}
        text1NumberOfLines={2}
      />
    ),

    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: COLORS.red, backgroundColor: COLORS.redBg, height: 48 }}
        text1Style={styles.text1}
        text2Style={styles.text2}
        text1NumberOfLines={2}
      />
    ),

    warning: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: COLORS.warning, height: 48 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        text1Style={styles.text1}
        text1NumberOfLines={2}
      />
    ),
  }

  return <RToast config={toastConfig} position="top" {...attributes} />
}

const styles = StyleSheet.create({
  text1: {
    ...TYPOGRAPHY.sm,
  },
  text2: {
    ...TYPOGRAPHY.sm,
  },
})
