import { FilterDateRange, RenderListQuery, TabBar } from '@/components'
import { CustomerItemLoading } from '@/screens'
import { useFilterSlice } from '@/store'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { CustomerRouteDetailNavigation, OrderRes, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import {
  CustomerOrderButtonActions,
  CustomerOrderItem,
  CustomerRouteDetailHeader,
} from './components'
import { styles } from './style'
import { useCustomerRouteDetail } from './useCustomerRouteDetail'

export const CustomerRouteDetailScreen = () => {
  const navigation = useNavigation<CustomerRouteDetailNavigation>()
  const { params } = useRoute<RouteProp<StackParamsList, 'CustomerRouteDetail'>>()
  const routeParams = useFilterSlice((state) => state.routeParams)

  const {
    data,
    isValidating,
    cancelAllCustomerOrder,
    cancelCustomerOrder,
    confirmAllCustomerOrder,
    mutate,
    startDeliveryCustomerOrder,
    updateOrderCustomerPaid,
    navigateToRouteDetail,
    filter,
  } = useCustomerRouteDetail(params)

  const navigateToCustomerOrderDetail = (data: OrderRes) => {
    navigation.navigate('CustomerOrderDetail', {
      ...params,
      order_code: data?.order_code,
      export_stock_order_id: data.id,
    })
  }

  return (
    <>
      <TabBar
        title={params?.customer_name}
        headerRight={<FilterDateRange initialData={routeParams} onChange={filter} />}
      />

      <View style={{ flex: 1 }}>
        <RenderListQuery
          ListHeaderComponent={
            <View style={{ marginTop: 12 }}>
              <CustomerRouteDetailHeader data={data} />
              <View style={styles.productHeader}>
                <Text style={[TYPOGRAPHY.title]}>Danh sách đơn hàng({data?.total_order || 0})</Text>
              </View>
            </View>
          }
          isValidating={isValidating}
          onRefresh={mutate}
          data={data?.sale_orders}
          ListHeaderLoadingComponent={CustomerItemLoading}
          LoadingComponent={CustomerItemLoading}
          emptyComponentProps={{
            title: 'Không có đơn hàng nào',
            titleBtn: 'Trở về trang chi tiết tuyến',
            onBtnPress: navigateToRouteDetail,
          }}
          renderItem={({ item }) => (
            <CustomerOrderItem
              disabled={!data?.start_processing}
              key={item.id}
              data={item}
              onPress={navigateToCustomerOrderDetail}
              onCancel={cancelCustomerOrder}
              onChange={updateOrderCustomerPaid}
            />
          )}
        />

        {!isValidating && data?.sale_orders?.length ? (
          <View style={COMMON_STYLES.buttonBottom}>
            <CustomerOrderButtonActions
              hasStarted={!!data?.start_processing}
              onConfirm={confirmAllCustomerOrder}
              onCancel={cancelAllCustomerOrder}
              onStart={startDeliveryCustomerOrder}
            />
          </View>
        ) : null}
      </View>
    </>
  )
}
