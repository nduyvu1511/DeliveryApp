import { Button, RenderListQuery, TabBar } from '@/components'
import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { CustomerOrderDetailHeader, ProductItem, ProductItemLoading } from '@/screens'
import { deliveryAPI } from '@/services'
import { COMMON_STYLES } from '@/theme'
import { DeliveryDraftRes, HomeNavigation, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import useSWR, { useSWRConfig } from 'swr'
import { styles } from './style'

export const OrderSearchDetailScreen = () => {
  const navigation = useNavigation<HomeNavigation>()
  const { asyncHandler } = useAsync()
  const { params } = useRoute<RouteProp<StackParamsList, 'OrderSearchDetail'>>()
  const { cache, mutate } = useSWRConfig()

  const {
    data,
    isValidating,
    mutate: mutateOrder,
  } = useSWR(`search_delivery_draft_${params.delivery_route_id}`, () =>
    deliveryAPI
      .getDetailDeliveryDraft({ delivery_route_id: params.delivery_route_id })
      .then((res) => res?.data)
  )

  const confirmDeliveryDraftReceived = () => {
    if (!data?.id) return

    asyncHandler({
      fetcher: deliveryAPI.confirmDeliveryDraftReceived({ export_stock_order_ids: [data.id] }),
      onSuccess: () => {
        const delivertDrafts: DeliveryDraftRes[] = cache.get(SWR_KEY.search_delivery_draft) || []
        const delivery = delivertDrafts?.find((item) => item?.id === data.id)
        const deliveryDraftReceiveds: DeliveryDraftRes[] =
          cache.get(SWR_KEY.search_delivery_draft_received) || []

        if (delivery?.id) {
          mutate<DeliveryDraftRes[]>(
            SWR_KEY.search_delivery_draft,
            [...delivertDrafts].filter((item) => item.id !== data.id),
            false
          )
          mutate<DeliveryDraftRes[]>(
            SWR_KEY.search_delivery_draft_received,
            [...deliveryDraftReceiveds, delivery],
            false
          )
        }

        navigation.navigate({
          name: 'OrderReceived',
          params: undefined,
          merge: true,
        })
      },
      config: {
        showSuccessMsg: false,
      },
    })
  }

  return (
    <>
      <TabBar title={params?.order_code} />

      <View style={styles.container}>
        <RenderListQuery
          isValidating={isValidating}
          onRefresh={mutateOrder}
          ListHeaderLoadingComponent={ProductItemLoading}
          LoadingComponent={ProductItemLoading}
          data={data?.sale_order_line}
          ListHeaderComponent={
            <CustomerOrderDetailHeader
              style={{ marginTop: 12 }}
              data={
                {
                  ...data,
                  customer_name: data?.customer.name || 'Chưa có khách hàng',
                  plan_date: data?.customer?.plan_date || '',
                } as any
              }
              readOnly
            />
          }
          renderItem={({ item }) => <ProductItem readOnly data={item} />}
        />

        {data?.state === 'draft' ? (
          <View style={COMMON_STYLES.buttonBottom}>
            <Button
              onPress={confirmDeliveryDraftReceived}
              style={{ flex: 1 }}
              title="Nhận đơn hàng"
            />
          </View>
        ) : null}
      </View>
    </>
  )
}
