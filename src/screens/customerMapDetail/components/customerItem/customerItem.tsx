import {
  BoxesIcon,
  ClockIcon,
  lineIcon,
  LocationAndOrderIcon,
  LocationIcon,
  MoneyArrowLeftIcon,
  MoneyIcon,
} from '@/assets'
import { Avatar, Button, CountUp, ListItem, Paper } from '@/components'
import { formatMoneyVND } from '@/helpers'
import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { CustomerMapDetailNavigation, CustomerRouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React from 'react'
import { Image, Linking, Pressable, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface CustomerItemProps {
  style?: ViewStyle | ViewStyle[]
  showLocationBtn?: boolean
  data: CustomerRouteRes
  onStart?: (_: CustomerRouteRes) => void
  onPress?: (_: CustomerRouteRes) => void
}

const ICON_SIZE = 18

export const CustomerItem = ({
  data,
  showLocationBtn = true,
  style,
  onPress,
  onStart,
}: CustomerItemProps) => {
  const navigation = useNavigation<CustomerMapDetailNavigation>()

  const navigateToCustomerMapDetail = () => {
    navigation.navigate('CustomerMapDetail', { ...data, route_name: data.name })
  }

  return (
    // <Pressable onPress={data?.start_processing ? () => onPress?.(data) : null}>
    <Pressable onPress={() => onPress?.(data)}>
      <Paper style={style}>
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <View style={styles.headerLeft}>
              <View style={styles.headerAvatar}>
                <Avatar size={32} url={data?.image} />
              </View>

              <View style={styles.headerInfo}>
                <Text numberOfLines={1} style={styles.headerInfoName}>
                  {data.name}
                </Text>

                <Pressable onPress={() => Linking.openURL(`tel:${data.phone}`)}>
                  <Text style={styles.headerInfoPhone}>{data.phone}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.headerRight}>
              {showLocationBtn ? (
                <Pressable style={styles.headerRightBtn} onPress={navigateToCustomerMapDetail}>
                  <LocationAndOrderIcon />
                </Pressable>
              ) : null}
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 12 }}>
              <LocationIcon />
            </View>

            <Text numberOfLines={2} style={{ ...TYPOGRAPHY.sm, flex: 1 }}>
              {data?.address?.full_adress || 'Không có địa chỉ'}
            </Text>
          </View>
        </View>

        {/* Separator */}
        <Image style={COMMON_STYLES.separateDashed} source={lineIcon} />

        {/* Content */}
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <ListItem
                leftIcon={<BoxesIcon size={ICON_SIZE} />}
                style={{ marginBottom: 12 }}
                label="Tổng đơn:"
                textstyle={{ justifyContent: 'flex-start' }}
                value={data?.total_order}
              />

              <ListItem
                leftIcon={<MoneyArrowLeftIcon size={ICON_SIZE} />}
                textstyle={{ justifyContent: 'flex-start' }}
                style={{ marginBottom: 12 }}
                label="Tổng tiền:"
                valueStyle={{ color: COLORS.red }}
                value={formatMoneyVND(data?.total_amount)}
              />
            </View>

            {data?.start_processing ? (
              <View style={[COMMON_STYLES.countUp, { marginLeft: 12 }]}>
                <CountUp startDate={data?.start_processing} endDate={data?.end_processing} />
              </View>
            ) : null}
          </View>

          <ListItem
            style={{ marginBottom: 12 }}
            textstyle={{ justifyContent: 'flex-start' }}
            leftIcon={<MoneyIcon size={ICON_SIZE} />}
            label="Đã thu:"
            value={formatMoneyVND(data?.customer_paid)}
          />

          <ListItem
            style={{ marginBottom: 12 }}
            textstyle={{ justifyContent: 'flex-start' }}
            leftIcon={<MoneyIcon size={ICON_SIZE} />}
            label="Còn thu:"
            value={formatMoneyVND((data?.total_amount || 0) - (data?.customer_paid || 0))}
          />

          <ListItem
            leftIcon={<ClockIcon size={ICON_SIZE} />}
            textstyle={{ justifyContent: 'flex-start' }}
            label="Thời gian dự kiến"
            value={moment(data?.plan_date).format('HH:mm DD/MM/YYYY')}
          />
        </View>

        <>
          {!data?.start_processing && onStart ? (
            <View style={{ marginTop: 16 }}>
              <Button onPress={() => onStart?.(data)} title="Bắt Đầu" />
            </View>
          ) : null}
        </>
      </Paper>
    </Pressable>
  )
}
