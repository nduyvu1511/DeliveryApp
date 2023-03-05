import { FilterDateRange, RenderListQuery, TabBar } from '@/components'
import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { CustomerItem, CustomerItemLoading, RouteDetailInfo } from '@/screens'
import { deliveryAPI } from '@/services'
import { useFilterSlice } from '@/store'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import {
  CustomerOrderDetailNavigation,
  CustomerRouteRes,
  DateFilter,
  GetRouteDetailRes,
  StackParamsList,
} from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import useSWR from 'swr'

export const RouteDetailHistoryScreen = () => {
  const { asyncHandler } = useAsync()
  const routeParams = useFilterSlice((state) => state.routeHistoryParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteHistoryParams)
  const navigation = useNavigation<CustomerOrderDetailNavigation>()
  const { params } = useRoute<RouteProp<StackParamsList, 'RouteDetail'>>()
  const { data, isValidating, mutate } = useSWR<GetRouteDetailRes | undefined>(
    SWR_KEY.route_detail_history(params.delivery_route_id),
    () =>
      deliveryAPI
        .getRouteDetailHistory({ delivery_route_id: params.delivery_route_id, ...routeParams })
        .then((res) => res?.data)
  )

  const RenderHeader = () => {
    if (!data) return null
    const { customers, ...rest } = data

    return (
      <>
        <RouteDetailInfo style={{ marginTop: 12 }} data={rest} />
        <View style={{ ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: -4, marginTop: 24 }}>
          <Text style={{ ...TYPOGRAPHY.title }}>
            Danh sách khách hàng({data?.customers?.length || 0})
          </Text>
        </View>
      </>
    )
  }

  const handleFilter = (data: DateFilter | undefined) => {
    setRouteParams(data)
    asyncHandler({
      fetcher: deliveryAPI.getRouteDetailHistory({
        delivery_route_id: params.delivery_route_id,
        ...routeParams,
        ...data,
      }),
      config: { showSuccessMsg: false, showErrorMsg: false },
      onSuccess: (res) => mutate(res, false),
      onError: () => mutate(undefined, false),
    })
  }

  const navigateToCustomerRouteDetail = (data: CustomerRouteRes) => {
    navigation.navigate('CustomerRouteDetailHistory', {
      customer_id: data.id,
      customer_name: data.name,
      delivery_route_id: data.delivery_route_id,
      route_name: params.route_name,
    })
  }

  return (
    <>
      <TabBar
        title={params?.route_name}
        headerRight={<FilterDateRange initialData={routeParams} onChange={handleFilter} />}
      />

      <RenderListQuery
        data={data?.customers}
        isValidating={isValidating}
        LoadingComponent={CustomerItemLoading}
        ListHeaderLoadingComponent={CustomerItemLoading}
        onRefresh={mutate}
        emptyComponentProps={{ title: 'Không có khách hàng nào' }}
        ListHeaderComponent={<RenderHeader />}
        renderItem={({ item }) => (
          <CustomerItem data={item} key={item.id} onPress={navigateToCustomerRouteDetail} />
        )}
      />
    </>
  )
}
