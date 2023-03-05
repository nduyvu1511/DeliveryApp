import { Alert, Button, ButtonProps } from '@/components'
import React, { useState } from 'react'
import { View } from 'react-native'

interface CustomerOrderButtonActionsProps {
  onCancel?: () => void
  onConfirm?: () => void
  onStart?: () => void
  disabled?: boolean
  hasStarted?: boolean
  cancelBtnProps?: Partial<ButtonProps>
  confirmBtnProps?: Partial<ButtonProps>
}

export const CustomerOrderButtonActions = ({
  hasStarted,
  cancelBtnProps,
  confirmBtnProps,
  disabled,
  onStart,
  onCancel,
  onConfirm,
}: CustomerOrderButtonActionsProps) => {
  const [alertModalType, setAlertModalType] = useState<'confirm' | 'cancel' | undefined>(undefined)

  const closeAlert = () => setAlertModalType(undefined)

  return (
    <>
      <Button
        disabled={disabled}
        onPress={() => setAlertModalType('cancel')}
        type="secondary"
        style={{ flex: 1 }}
        title="Hủy đơn"
        {...cancelBtnProps}
      />

      <View style={{ width: 12 }} />

      {hasStarted ? (
        <Button
          disabled={disabled}
          onPress={() => setAlertModalType('confirm')}
          style={{ flex: 1 }}
          title="Xác nhận"
          {...confirmBtnProps}
        />
      ) : (
        <Button
          disabled={disabled}
          onPress={() => onStart?.()}
          title="Bắt Đầu"
          style={{ flex: 1 }}
        />
      )}

      <Alert
        visible={!!alertModalType}
        type="info"
        desc={
          alertModalType === 'cancel'
            ? 'Nếu đồng ý, bạn sẽ hủy toàn bộ đơn hàng của khách hàng này'
            : 'Vui lòng kiểm tra số tiền nhận được cho mỗi đơn hàng trước khi bấm xác nhận'
        }
        onDismiss={closeAlert}
        onLeftBtnPress={closeAlert}
        onRightBtnPress={() => (alertModalType === 'cancel' ? onCancel?.() : onConfirm?.())}
      />
    </>
  )
}
