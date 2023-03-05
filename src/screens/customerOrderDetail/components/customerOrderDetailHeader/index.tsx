import { lineIcon, OrderIcon } from '@/assets'
import { CollapseView, InputSelectNumber, ListItem, Paper } from '@/components'
import { ORDER_STATE_NAME } from '@/constants'
import { formatMoneyVND } from '@/helpers'
import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { GetCustomerOrderDetailRes, UpdateOrderCustomerPaid } from '@/types'
import moment from 'moment'
import React from 'react'
import { Image, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface CustomerOrderDetailHeaderProps {
  data: GetCustomerOrderDetailRes | undefined
  style?: ViewStyle | ViewStyle[]
  readOnly?: boolean
  onConfirm?: (_: UpdateOrderCustomerPaid) => void
}

export const CustomerOrderDetailHeader = ({
  data,
  style,
  readOnly = false,
  onConfirm,
}: CustomerOrderDetailHeaderProps) => {
  if (!data?.id) return null

  console.log(data.customer_paid)

  return (
    <View style={style}>
      <Paper style={styles.infoElement}>
        <View style={{ ...COMMON_STYLES.flexRowCenter, marginBottom: 12 }}>
          <OrderIcon fill={COLORS.primary} />
          <Text numberOfLines={1} style={{ ...TYPOGRAPHY.baseSemiBold, marginLeft: 12, flex: 1 }}>
            Mã đơn: {data.order_code}
          </Text>
        </View>

        <ListItem label="Tên khách hàng" value={data.customer_name} style={styles.listItem} />
        <ListItem label="Nhân viên kinh doanh" value={data.user_name} style={styles.listItem} />
        <ListItem
          label="Ngày đặt hàng"
          value={moment(data.date_order).format('HH:mm DD/MM/YYYY')}
          style={styles.listItem}
        />

        <>
          {data?.plan_date ? (
            <ListItem
              label="Ngày giao hàng"
              value={moment(data.plan_date).format('HH:mm DD/MM/YYYY')}
              style={styles.listItem}
            />
          ) : null}
        </>

        <ListItem
          label="Trạng thái"
          value={ORDER_STATE_NAME[data?.state]}
          style={{ marginBottom: 0 }}
        />

        <CollapseView label="Xem thêm" duration={50} initialHeight={202}>
          <Image style={[COMMON_STYLES.separateDashed, { marginVertical: 16 }]} source={lineIcon} />

          <ListItem
            label="Tổng giá trị đơn:"
            value={formatMoneyVND(data.amount_total)}
            style={styles.listItem}
          />
          <ListItem
            label="Số tiền phải thu"
            value={formatMoneyVND(data.payment_amount)}
            style={styles.listItem}
          />

          <InputSelectNumber
            readOnly={readOnly}
            type="money"
            title="Số tiền nhận được"
            limit={data.payment_amount}
            value={data.customer_paid}
            style={styles.listItem}
            onConfirm={(val) =>
              onConfirm?.({ customer_paid: val.value, export_stock_order_id: data.id })
            }
          />
          <ListItem label="Số lượng trả:" value={data.returned_quantity} style={styles.listItem} />
          <ListItem
            label="Giá trị hàng trả:"
            value={formatMoneyVND(data.amount_returned)}
            style={{ marginBottom: 0 }}
          />
        </CollapseView>
      </Paper>

      <View style={{ ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: -4 }}>
        <Text style={{ ...TYPOGRAPHY.title }}>
          Danh sách sản phẩm({data?.sale_order_line?.length || 0})
        </Text>
      </View>
    </View>
  )
}
