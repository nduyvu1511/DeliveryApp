import { ClockIcon, lineIcon, LocationIcon } from '@/assets'
import { Avatar, CollapseView, CountUp, ListItem, Paper } from '@/components'
import { formatMoneyVND } from '@/helpers'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { CustomerRouteInfo } from '@/types'
import moment from 'moment'
import React from 'react'
import { Image, Linking, Pressable, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface CustomerRouteDetailHeader {
  data: CustomerRouteInfo | undefined
  style?: ViewStyle | ViewStyle[]
}

export const CustomerRouteDetailHeader = ({ data, style }: CustomerRouteDetailHeader) => {
  if (!data) return null

  console.log(data.start_processing)

  return (
    <Paper style={style}>
      <View style={styles.headerInner}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAvatar}>
            <Avatar size={32} url={data.image} />
          </View>

          <View style={styles.headerInfo}>
            <Text numberOfLines={1} style={styles.headerInfoName}>
              {data?.name}
            </Text>
            <Pressable onPress={() => Linking.openURL(`tel:${data.phone}`)}>
              <Text style={styles.headerInfoPhone}>{data?.phone}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ marginRight: 12 }}>
          <LocationIcon />
        </View>

        <Text style={{ ...TYPOGRAPHY.sm, flex: 1 }}>{data?.address?.full_adress}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ marginRight: 12 }}>
          <ClockIcon />
        </View>

        <Text numberOfLines={1} style={{ ...TYPOGRAPHY.sm, flex: 1 }}>
          Thời gian dự kiến: {moment(data?.plan_date)?.format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>

      <CollapseView initialHeight={226}>
        <Image style={COMMON_STYLES.separateDashed} source={lineIcon} />

        <ListItem
          label="Tổng giá trị đơn:"
          style={{ marginBottom: 12 }}
          value={formatMoneyVND(data?.total_amount)}
        />
        <ListItem label="Tổng đơn:" style={{ marginBottom: 12 }} value={data?.total_order} />
        <ListItem label="Tổng sản phẩm:" style={{ marginBottom: 12 }} value={data?.total_product} />
        <ListItem
          label="Tổng tiền tạm tính:"
          style={{ marginBottom: 12 }}
          value={formatMoneyVND(data?.total_paid)}
        />
        <ListItem
          style={{ marginBottom: 12 }}
          label="Tổng tiền nhận được:"
          value={formatMoneyVND(data?.customer_paid)}
        />
        <ListItem
          label="Tổng thời gian giao"
          rightElement={
            <View style={[COMMON_STYLES.countUp]}>
              <CountUp startDate={data?.start_processing} endDate={data?.end_processing} />
            </View>
          }
        />
      </CollapseView>
    </Paper>
  )
}
