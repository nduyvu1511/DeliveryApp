import { FilterDateRange, RenderListQuery, TabBar } from '@/components'
import { useBackFocus, useQueryList } from '@/hooks'
import { RouteItem, RouteItemLoading } from '@/screens'
import { deliveryAPI } from '@/services'
import { useFilterSlice } from '@/store'
import { DateFilter, OrderHistoryFilterNavigation, RouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const RouteListHistoryScreen = () => {
  const navigation = useNavigation<OrderHistoryFilterNavigation>()
  const routeParams = useFilterSlice((state) => state.routeHistoryParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteHistoryParams)

  const data = useQueryList<RouteRes, any>({
    key: 'get_route_history',
    fetcher: deliveryAPI.getRouteHistoryList,
    initialParams: routeParams,
  })

  useBackFocus(data?.mutate)

  const navigateToRouteDetailHistory = (data: RouteRes) => {
    navigation.navigate('RouteDetailHistory', {
      delivery_route_id: data.id,
      route_name: data.name,
    })
  }

  const handleFilter = (params: DateFilter | undefined) => {
    setRouteParams(params)
    data?.filter?.({ params })
  }

  return (
    <>
      <TabBar
        title="Lịch sử tuyến đi"
        headerRight={<FilterDateRange initialData={routeParams} onChange={handleFilter} />}
      />

      <RenderListQuery
        {...data}
        LoadingComponent={RouteItemLoading}
        renderItem={({ item }) => (
          <RouteItem onPress={navigateToRouteDetailHistory} key={item.id} data={item} />
        )}
      />
    </>
  )
}
