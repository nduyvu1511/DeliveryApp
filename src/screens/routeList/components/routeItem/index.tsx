import {
  BagIcon,
  BoxesIcon,
  ClockIcon,
  lineIcon,
  MoneyArrowLeftIcon,
  MoneyCheckIcon,
  MoneyIcon,
  MultipleUserIcon,
} from '@/assets'
import { Avatar, ListItem, Paper } from '@/components'
import { formatMoneyVND } from '@/helpers'
import { COLORS, COMMON_STYLES } from '@/theme'
import { RouteRes } from '@/types'
import moment from 'moment'
import React from 'react'
import { Image, Pressable, Text, View, ViewStyle } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { styles } from './style'

interface RouteItemProps {
  data: RouteRes
  style?: ViewStyle | ViewStyle[] | undefined
  onPress?: (_: RouteRes) => void
}

const ICON_SIZE = 20

export const RouteItem = ({ data, style, onPress }: RouteItemProps) => {
  console.log(data)
  return (
    <Pressable onPress={() => onPress?.(data)} style={style}>
      <Paper>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar size={32} url={data?.image} />

          <View style={{ marginLeft: 12 }}>
            <Text numberOfLines={1} style={styles.userName}>
              {data.name}
            </Text>
          </View>
        </View>

        {/* Separator */}
        <Image style={styles.separate} source={lineIcon} />

        <View>
          <ListItem
            style={{ marginBottom: 12 }}
            label="Tổng đơn hàng"
            value={data.total_order}
            leftIcon={<BoxesIcon size={ICON_SIZE} />}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            label="Số lượng sản phẩm"
            value={data.total_product}
            leftIcon={<BagIcon size={ICON_SIZE} />}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            label="Tổng khách"
            value={data.total_customer}
            leftIcon={<MultipleUserIcon size={ICON_SIZE} />}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            label="Tổng tiền"
            valueStyle={{ color: COLORS.red }}
            value={formatMoneyVND(data.total_amount)}
            leftIcon={<MoneyIcon size={ICON_SIZE} />}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            label="Tiền phải thu"
            value={formatMoneyVND(data.total_paid)}
            leftIcon={<MoneyArrowLeftIcon size={ICON_SIZE} />}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            label="Tiền đã thu"
            value={formatMoneyVND(data.customer_paid)}
            leftIcon={<MoneyCheckIcon size={ICON_SIZE} />}
          />

          <ListItem
            label="Giao vào"
            value={moment(data.plan_date).format('HH:mm DD/MM/YYYY')}
            leftIcon={<ClockIcon size={ICON_SIZE} />}
          />
        </View>
      </Paper>
    </Pressable>
  )
}

export const RouteItemLoading = ({ style = {} }: { style?: ViewStyle }) => {
  return (
    <Paper style={style}>
      <SkeletonPlaceholder speed={800} borderRadius={4}>
        <>
          <View style={{ ...COMMON_STYLES.flexRowCenter, marginBottom: 16 }}>
            <View style={styles.avatar} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={[styles.line, { marginBottom: 12 }]} />
              <View style={styles.line} />
            </View>
          </View>

          {Array.from({ length: 7 }).map((_, index) => (
            <View key={index} style={[styles.item, index === 6 && { marginBottom: 0 }]}>
              <View style={styles.icon} />
              <View style={styles.line} />
            </View>
          ))}
        </>
      </SkeletonPlaceholder>
    </Paper>
  )
}
