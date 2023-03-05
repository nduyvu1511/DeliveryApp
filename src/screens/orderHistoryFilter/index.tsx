import { Button, InputDateRange, InputSelectModalItem, TabBar, Tabs } from '@/components'
import { COLORS } from '@/theme'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { styles } from './style'

export const OrderHistoryFilterScreen = () => {
  return (
    <>
      <TabBar title="Bộ lọc" />
      <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.title}>Trạng thái</Text>
            {/* <Tabs<string> data={data} itemActive="2" /> */}
          </View>

          {/* Filter Select */}
          <View style={{ padding: 16, flex: 1 }}>
            <View style={{ marginBottom: 24 }}>
              <InputSelectModalItem label="Tuyến đi" placeholder="Tuyến đi" data={[]} />
            </View>

            <View style={{ marginBottom: 24 }}>
              <InputSelectModalItem label="Khách hàng" placeholder="Khách hàng" data={[]} />
            </View>

            <View style={{ marginBottom: 24 }}>
              <InputSelectModalItem label="Nhân viên" placeholder="Nhân viên" data={[]} />
            </View>

            <View style={{ marginBottom: 24 }}>
              <InputSelectModalItem label="Gần đây" placeholder="Gần đây" data={[]} />
            </View>

            <InputDateRange label="Thời gian" />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Đặt lại"
            style={styles.footerBtn}
            textStyle={{ color: COLORS.primary }}
            onPress={() => {
              console.log('Đặt lại')
            }}
          />
          <View style={{ width: 16 }} />
          <Button
            title="Áp dụng"
            style={styles.footerBtn}
            onPress={() => {
              console.log('Áp dụng')
            }}
          />
        </View>
      </View>
    </>
  )
}
