import { RenderListQuery, TabBar } from '@/components'
import { CustomerItemLoading, CustomerOrderDetailHeader, ProductItem } from '@/screens'
import { StackParamsList } from '@/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { useCustomerOrderDetailHistory } from './useCustomerOrderDetailHistory'

export const CustomerOrderDetailHistoryScreen = () => {
  const { params } = useRoute<RouteProp<StackParamsList, 'CustomerOrderDetailHistory'>>()
  const { data, isValidating, mutate, updateCustomerOrder, updateOrderCustomerPaid } =
    useCustomerOrderDetailHistory(params)

  return (
    <>
      <TabBar title={params.order_code} />
      <RenderListQuery
        onRefresh={mutate}
        data={data?.sale_order_line}
        ListHeaderComponent={
          <CustomerOrderDetailHeader
            onConfirm={updateOrderCustomerPaid}
            readOnly={data?.state === 'done'}
            style={{ marginTop: 12 }}
            data={data}
          />
        }
        isValidating={isValidating}
        LoadingComponent={CustomerItemLoading}
        ListHeaderLoadingComponent={CustomerItemLoading}
        renderItem={({ item }) => (
          <ProductItem
            key={item.id}
            readOnly={data?.state === 'done'}
            onChange={updateCustomerOrder}
            data={item}
          />
        )}
      />
    </>
  )
}
