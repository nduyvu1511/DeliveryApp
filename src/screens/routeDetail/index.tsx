import { FilterDateRange, RenderListQuery, TabBar } from '@/components'
import { CustomerItem, CustomerItemLoading } from '@/screens'
import { useFilterSlice } from '@/store'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import { CustomerOrderDetailNavigation, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { RouteDetailInfo } from './components'
import { styles } from './style'
import { useRouteDetail } from './useRouteDetail'

export const RouteDetailScreen = () => {
  const routeParams = useFilterSlice((state) => state.routeParams)
  const navigation = useNavigation<CustomerOrderDetailNavigation>()
  const { params } = useRoute<RouteProp<StackParamsList, 'RouteDetail'>>()
  const { isValidating, mutate, navigateToRouteOrderDetail, startCustomerRoute, data, filter } =
    useRouteDetail(params)

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

  return (
    <>
      <TabBar
        title={params?.route_name}
        headerRight={<FilterDateRange initialData={routeParams} onChange={filter} />}
      />

      <View style={styles.container}>
        <RenderListQuery
          data={data?.customers}
          isValidating={isValidating}
          LoadingComponent={CustomerItemLoading}
          ListHeaderLoadingComponent={CustomerItemLoading}
          onRefresh={mutate}
          emptyComponentProps={{
            title: 'Không có khách hàng nào',
            titleBtn: 'Trở về trang chủ',
            onBtnPress: () => navigation.navigate('Home'),
          }}
          ListHeaderComponent={<RenderHeader />}
          renderItem={({ item }) => (
            <CustomerItem
              data={item}
              key={item.id}
              onPress={navigateToRouteOrderDetail}
              onStart={startCustomerRoute}
            />
          )}
        />
      </View>
    </>
  )
}

export * from './components'
