import { RenderListQuery } from '@/components'
import { SWR_KEY } from '@/constants'
import { useQueryList } from '@/hooks'
import { deliveryAPI } from '@/services'
import { DeliveryDraftRes, HomeNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { OrderItem, OrderLoadingItem } from './components'

export const SearchOrderReceivedScreen = () => {
  const navigation = useNavigation<HomeNavigation>()
  const data = useQueryList<DeliveryDraftRes, any>({
    fetcher: deliveryAPI.searchDeliveryDraftReceived,
    key: SWR_KEY.search_delivery_draft_received,
  })

  const navigateToOrderDetail = (data: DeliveryDraftRes) => {
    navigation.navigate('CustomerOrderDetail', {
      delivery_route_id: data.id,
      customer_id: data?.customer?.customer_id,
      customer_name: data.customer?.customer_name,
      export_stock_order_id: data?.id,
      order_code: data?.order_code,
      route_name: data?.delivery_route?.delivery_route_name,
      screen: 'SearchOrderReceived',
    })
  }

  return (
    <RenderListQuery
      LoadingComponent={OrderLoadingItem}
      emptyComponentProps={{ title: 'Không tìm thấy đơn hàng nào' }}
      renderItem={({ item }) => (
        <OrderItem onPress={navigateToOrderDetail} data={item} key={item.id} />
      )}
      {...data}
    />
  )
}
