import { RenderListQuery } from '@/components'
import { SWR_KEY } from '@/constants'
import { useQueryList } from '@/hooks'
import { deliveryAPI } from '@/services'
import { DeliveryDraftRes, HomeNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { OrderItem, OrderLoadingItem } from './components'

export const SearchOrderNoReceivedScreen = () => {
  const navigation = useNavigation<HomeNavigation>()
  const data = useQueryList<DeliveryDraftRes, any>({
    fetcher: deliveryAPI.searchDeliveryDraft,
    key: SWR_KEY.search_delivery_draft,
  })

  const navigateToOrderDetail = (data: DeliveryDraftRes) => {
    navigation.navigate('OrderSearchDetail', {
      delivery_route_id: data.id,
      order_code: data.order_code,
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
