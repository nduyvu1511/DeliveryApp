import { FilterDateRange, RenderListQuery, TabBar } from '@/components'
import { CustomerItemLoading, CustomerOrderItem, CustomerRouteDetailHeader } from '@/screens'
import { useFilterSlice } from '@/store'
import { TYPOGRAPHY } from '@/theme'
import { StackParamsList } from '@/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { useCustomerRouteDetailHistory } from './useCustomerRouteDetailHistory'

export const CustomerRouteDetailHistoryScreen = () => {
  const routeParams = useFilterSlice((state) => state.routeHistoryParams)
  const { params } = useRoute<RouteProp<StackParamsList, 'CustomerRouteDetailHistory'>>()

  const {
    data,
    isValidating,
    mutate,
    filter,
    updateOrderCustomerPaid,
    navigateToCustomerOrderDetailHistory,
  } = useCustomerRouteDetailHistory(params)

  return (
    <>
      <TabBar
        title={params.customer_name}
        headerRight={<FilterDateRange initialData={routeParams} onChange={filter} />}
      />

      <RenderListQuery
        isValidating={isValidating}
        data={data?.sale_orders}
        LoadingComponent={CustomerItemLoading}
        onRefresh={mutate}
        ListHeaderComponent={
          data?.id ? (
            <View style={{ marginTop: 12 }}>
              <CustomerRouteDetailHeader data={data} />
              <View style={{ marginTop: 24 }}>
                <Text style={[TYPOGRAPHY.title]}>Danh sách đơn hàng({data?.total_order || 0})</Text>
              </View>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <CustomerOrderItem
            onChange={updateOrderCustomerPaid}
            onPress={navigateToCustomerOrderDetailHistory}
            key={item.id}
            data={item}
          />
        )}
      />
    </>
  )
}
