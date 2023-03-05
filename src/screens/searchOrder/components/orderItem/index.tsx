import { OrderIcon } from '@/assets'
import { ListItem, Paper } from '@/components'
import { ORDER_STATE_NAME } from '@/constants'
import { COLORS, COMMON_STYLES } from '@/theme'
import { DeliveryDraftRes } from '@/types'
import moment from 'moment'
import React from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { styles } from './style'

interface OrderItemProps {
  data: DeliveryDraftRes
  style?: ViewStyle
  onPress?: (_: DeliveryDraftRes) => void
}

export const OrderItem = ({ data, style, onPress }: OrderItemProps) => {
  return (
    <Pressable onPress={() => onPress?.(data)}>
      <Paper style={style}>
        <View style={styles.header}>
          <OrderIcon fill={COLORS.primary} />

          <Text numberOfLines={1} style={styles.headerText}>
            Mã đơn: {data?.order_code}
          </Text>
        </View>

        <View style={styles.content}>
          <ListItem
            style={{ marginBottom: 12 }}
            label="Trạng thái"
            value={ORDER_STATE_NAME[data.state]}
          />
          <ListItem
            style={{ marginBottom: 12 }}
            label="Khách hàng"
            value={data?.customer?.customer_name || '...'}
          />
          <ListItem
            label="Ngày đặt hàng"
            value={data?.date_order ? moment(data?.date_order).format('DD/MM/YYYY') : '...'}
          />
        </View>
      </Paper>
    </Pressable>
  )
}

type OrderLoadingItemProps = {
  style?: ViewStyle
}

export const OrderLoadingItem = ({ style }: OrderLoadingItemProps) => {
  return (
    <Paper style={style}>
      <SkeletonPlaceholder speed={800} borderRadius={4}>
        <>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <View style={styles.circle} />
            <View style={{ width: 220, height: 18, marginLeft: 12 }} />
          </View>
          <View style={styles.content}>
            <View style={{ ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: 12 }}>
              <View style={{ width: 80, height: 12 }} />
              <View style={{ flex: 1, marginLeft: 12, height: 12 }} />
            </View>

            <View style={{ ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: 12 }}>
              <View style={{ width: 80, height: 12 }} />
              <View style={{ flex: 1, marginLeft: 12, height: 12 }} />
            </View>

            <View style={{ ...COMMON_STYLES.flexRowSpaceBetween }}>
              <View style={{ width: 80, height: 12 }} />
              <View style={{ flex: 1, marginLeft: 12, height: 12 }} />
            </View>
          </View>
        </>
      </SkeletonPlaceholder>
    </Paper>
  )
}
