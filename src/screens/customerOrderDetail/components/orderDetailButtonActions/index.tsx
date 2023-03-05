import { Alert, Button } from '@/components'
import React, { useState } from 'react'
import { View } from 'react-native'

interface OrderDetailButtonActionsProps {
  onCancel?: () => void
  onConfirm?: () => void
  rightBtnLabel?: string
}

export const OrderDetailButtonActions = ({
  onCancel,
  onConfirm,
  rightBtnLabel,
}: OrderDetailButtonActionsProps) => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>()

  const closeAlert = () => setShowAlertModal(undefined)

  return (
    <>
      <Button
        onPress={() => setShowAlertModal(true)}
        type="secondary"
        style={{ flex: 1 }}
        title="Hủy đơn"
      />

      <View style={{ width: 12 }} />
      <Button
        onPress={() => onConfirm?.()}
        style={{ flex: 1 }}
        title={`${rightBtnLabel || 'Chụp hình'}`}
      />

      <Alert
        visible={!!showAlertModal}
        type={'info'}
        desc={'Nếu đồng ý, bạn sẽ hủy toàn bộ đơn hàng của khách hàng này'}
        onDismiss={closeAlert}
        onLeftBtnPress={closeAlert}
        onRightBtnPress={() => onCancel?.()}
      />
    </>
  )
}
