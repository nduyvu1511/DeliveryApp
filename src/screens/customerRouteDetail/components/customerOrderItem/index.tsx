import { OrderIcon, TrashIcon } from '@/assets'
import { Alert, IconButton, InputSelectNumber, ListItem, Paper, StatusBadge } from '@/components'
import { formatMoneyVND } from '@/helpers'
import { COLORS } from '@/theme'
import { OrderRes } from '@/types'
import { useState } from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface CustomerOrderItemProps {
  style?: ViewStyle | ViewStyle[] | undefined
  data: OrderRes
  disabled?: boolean
  onChange?: (_: OrderRes & { customer_paid: number }) => void
  onPress?: (_: OrderRes) => void
  onCancel?: (_: OrderRes) => void
}

export const CustomerOrderItem = ({
  style = {},
  data,
  disabled,
  onChange,
  onPress,
  onCancel,
}: CustomerOrderItemProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const closeDeleteAlert = () => setShowDeleteAlert(false)

  return (
    <>
      <Pressable disabled={disabled} style={style} onPress={() => onPress?.(data)}>
        <Paper>
          <View style={[styles.header, disabled && styles.disabled]}>
            <View style={styles.headerLeft}>
              <OrderIcon fill={COLORS.primary} size={20} />

              <Text numberOfLines={1} style={styles.headerTitle}>
                Mã đơn: {data?.order_code || data?.id}
              </Text>
            </View>

            {onCancel ? (
              <IconButton
                disabled={disabled}
                onPress={() => setShowDeleteAlert(true)}
                icon={<TrashIcon height={20} width={18} fill={COLORS.error} />}
              />
            ) : null}
          </View>

          <View style={[disabled && styles.disabled]}>
            <ListItem
              style={{ marginBottom: 12 }}
              label="Trạng thái"
              rightElement={
                data?.is_edit ? (
                  <StatusBadge title="Đã chỉnh sửa" bg={COLORS.bgPrimary} color={COLORS.primary} />
                ) : (
                  <StatusBadge title="Chưa chỉnh sửa" bg={COLORS.redBg} color={COLORS.red} />
                )
              }
            />

            <ListItem
              style={{ marginBottom: 12 }}
              label="Số lượng sản phẩm:"
              value={data?.quantity_total || 0}
            />

            <ListItem
              style={{ marginBottom: 12 }}
              label="Số sản phẩm giao:"
              value={data.quantity_total - data.returned_quantity}
            />

            <ListItem
              style={{ marginBottom: 12 }}
              label="Số sản phẩm trả:"
              value={data.returned_quantity}
            />

            <ListItem
              style={{ marginBottom: 12 }}
              label="Số tiền phải thu:"
              value={formatMoneyVND(data.payment_amount)}
            />

            <InputSelectNumber
              readOnly={disabled || data?.state === 'done'}
              type="money"
              limit={data.payment_amount}
              value={data.customer_paid}
              onConfirm={(val) => onChange?.({ ...data, customer_paid: val.value })}
              title="Số tiền nhận được:"
            />
          </View>
        </Paper>
      </Pressable>

      <Alert
        type="info"
        desc="Nếu đồng ý, bạn sẽ hủy toàn bộ sản phẩm trong đơn hàng này"
        onLeftBtnPress={closeDeleteAlert}
        onRightBtnPress={() => onCancel?.(data)}
        onDismiss={closeDeleteAlert}
        visible={showDeleteAlert}
      />
    </>
  )
}
