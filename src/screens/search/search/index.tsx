import { RenderListQuery, SearchInput, TabBar } from '@/components'
import { useQueryList } from '@/hooks'
import { CustomerItem, RouteItemLoading } from '@/screens'
import { deliveryAPI } from '@/services'
import {
  CustomerRouteRes,
  GetRouteList,
  RouteDetailNavigation,
  SearchDeliveryByCustomerRes,
} from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const SearchScreen = () => {
  const navigation = useNavigation<RouteDetailNavigation>()
  const data = useQueryList<SearchDeliveryByCustomerRes, GetRouteList>({
    fetcher: deliveryAPI.searchDeliveryByCustomer,
    initialParams: { keyword: '', limit: 8 },
    key: 'search_delivery_by_customer',
  })

  const navigateToCustomerRouteDetail = (data: CustomerRouteRes) => {
    navigation.navigate('CustomerRouteDetail', {
      customer_id: data.id,
      customer_name: data.name,
      delivery_route_id: data?.delivery_route_id,
      route_name: '',
    })
  }

  return (
    <>
      <TabBar
        headerCenter={
          <SearchInput
            autoFocus
            placeholder="Tìm khách hàng theo tên hoặc SĐT"
            leftIconStyle={{ display: 'none' }}
            style={{ paddingHorizontal: 0 }}
            timer={300}
            onChangeText={(val) => {
              data?.filter({ params: { keyword: val } })
            }}
          />
        }
      />

      <RenderListQuery
        LoadingComponent={RouteItemLoading}
        emptyComponentProps={{ title: 'Không có tuyến nào được tìm thấy' }}
        renderItem={({ item }) => (
          <CustomerItem
            onPress={navigateToCustomerRouteDetail}
            data={item as CustomerRouteRes}
            key={item.id}
          />
        )}
        {...data}
      />
    </>
  )
}
