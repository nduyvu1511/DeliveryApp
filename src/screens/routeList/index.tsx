import { FilterDateRange, RenderListQuery } from '@/components'
import { useBackFocus, useQueryList } from '@/hooks'
import { deliveryAPI, userAPI } from '@/services'
import { useFilterSlice, useUserInfoSlice } from '@/store'
import { DateFilter, RouteDetailNavigation, RouteRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import useSWR from 'swr'
import { HomeHeader, RouteItem, RouteItemLoading } from './components'
import { styles } from './style'

export const RouteListScreen = () => {
  const navigation = useNavigation<RouteDetailNavigation>()
  const routeParams = useFilterSlice((state) => state.routeParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteParams)
  const setUserInfo = useUserInfoSlice((state) => state.setUserInfo)

  const { mutate: mutateUser } = useSWR('get_user_info', () =>
    userAPI.getDetailUser().then((res) => {
      if (res?.data?.detail_shipper?.partner_id) {
        setUserInfo(res?.data)
      }
    })
  )

  const data = useQueryList<RouteRes, any>({
    fetcher: deliveryAPI.getRouteList,
    key: 'get_route_list',
    initialParams: routeParams,
  })

  useBackFocus(() => {
    data.mutate()
    mutateUser()
  })

  const navigateToRouteDetail = (data: RouteRes) => {
    navigation.navigate('RouteDetail', { delivery_route_id: data.id, route_name: data.name })
  }

  const handleFilter = (params: DateFilter | undefined) => {
    setRouteParams(params)
    data?.filter?.({ params })
  }

  const handleRefresh = () => {
    data?.refresh?.()
    mutateUser()
  }

  return (
    <RenderListQuery
      {...data}
      onRefresh={handleRefresh}
      containerStyle={{ paddingHorizontal: 0 }}
      LoadingComponent={() => <RouteItemLoading style={{ marginHorizontal: 16 }} />}
      emptyComponentProps={{ title: 'Không có tuyến nào được tìm thấy' }}
      ListHeaderComponent={
        <>
          <HomeHeader />
          <View style={{ height: 48 }} />
          <View style={styles.titleArea}>
            <Text style={styles.title}>Chuyến đi hiện có ({data?.data?.length || 0})</Text>
            <FilterDateRange initialData={routeParams} onChange={handleFilter} />
          </View>
        </>
      }
      renderItem={({ item }) => (
        <RouteItem
          style={{ marginHorizontal: 16 }}
          onPress={navigateToRouteDetail}
          data={item}
          key={item.id}
        />
      )}
    />
  )
}

export * from './components'
