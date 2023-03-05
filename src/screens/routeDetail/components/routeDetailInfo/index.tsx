import { ListItem, Paper } from '@/components'
import { formatMoneyVND } from '@/helpers'
import React from 'react'
import { ViewStyle } from 'react-native'

interface RouteDetailInfoProps {
  data: {
    total_order: number
    total_product: number
    total_amount: number
    customer_paid: number
    total_return: number
  }
  style?: ViewStyle | ViewStyle[]
}

export const RouteDetailInfo = ({ style, data }: RouteDetailInfoProps) => {
  return (
    <Paper style={style}>
      <ListItem
        style={{ marginBottom: 16 }}
        label="Tổng giá trị đơn:"
        value={formatMoneyVND(data?.total_amount)}
      />
      <ListItem
        style={{ marginBottom: 16 }}
        label="Giá trị hàng trả:"
        value={formatMoneyVND(data?.total_return)}
      />
      <ListItem
        style={{ marginBottom: 16 }}
        label="Tổng tiền nhận được:"
        value={formatMoneyVND(data?.customer_paid)}
      />
      <ListItem
        style={{ marginBottom: 0 }}
        label="Tiền chưa thanh toán:"
        value={formatMoneyVND((data?.total_amount || 0) - (data?.customer_paid || 0))}
      />
    </Paper>
  )
}
