import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { deliveryAPI } from '@/services'
import { useCommonSlice, useFilterSlice } from '@/store'
import {
  CustomerRouteDetailNavigation,
  CustomerRouteDetailParams,
  DateFilter,
  DetailCustomerRouteRes,
  OrderRes,
} from '@/types'
import { useNavigation } from '@react-navigation/native'
import useSWR, { useSWRConfig } from 'swr'

type UseCustomerRouteDetailHistoryProps = CustomerRouteDetailParams

export const useCustomerRouteDetailHistory = ({
  customer_id,
  delivery_route_id,
  customer_name,
  route_name,
}: UseCustomerRouteDetailHistoryProps) => {
  const { mutate: mutateRouteDetail } = useSWRConfig()
  const routeParams = useFilterSlice((state) => state.routeParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteParams)
  const { asyncHandler } = useAsync()
  const navigation = useNavigation<CustomerRouteDetailNavigation>()
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)

  const { data, isValidating, mutate } = useSWR(
    SWR_KEY.customer_route_detail_history(customer_id),
    () =>
      deliveryAPI
        .getCustomerRouteDetailHistory({
          delivery_route_id,
          customer_id,
          ...routeParams,
        })
        .then((res) => res?.data)
  )

  const mutateRouteDetailHistoryState = () => {
    mutateRouteDetail(SWR_KEY.route_detail_history(delivery_route_id))
  }

  const fetchCustomerRouteDetail = async (
    loading = true
  ): Promise<DetailCustomerRouteRes | undefined> => {
    try {
      loading && setBackdropVisible(true)
      const res = await deliveryAPI.getCustomerRouteDetailHistory({
        customer_id,
        delivery_route_id,
        ...routeParams,
      })
      loading && setBackdropVisible(false)
      return res?.data
    } catch (error) {
      loading && setBackdropVisible(false)
      return undefined
    }
  }

  const filter = (data: DateFilter | undefined) => {
    setRouteParams(data)

    asyncHandler({
      fetcher: deliveryAPI.getCustomerRouteDetailHistory({
        delivery_route_id,
        customer_id,
        ...data,
      }),
      config: { showSuccessMsg: false, showErrorMsg: false },
      onSuccess: (res) => mutate(res, false),
      onError: () => mutate(undefined, false),
    })
  }

  const navigateToCustomerOrderDetailHistory = (data: OrderRes) => {
    navigation.navigate('CustomerOrderDetailHistory', {
      delivery_route_id,
      route_name,
      customer_name,
      export_stock_order_id: data.id,
      order_code: data?.order_code || data?.order_name,
      customer_id,
    })
  }

  const updateOrderCustomerPaid = (params: OrderRes & { customer_paid: number }) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.updateOrderCustomerPaid({
        export_stock_order_id: params.id,
        customer_paid: params.customer_paid,
      }),
      onSuccess: async () => {
        mutateRouteDetailHistoryState()
        const data = await fetchCustomerRouteDetail()
        mutate(data, false)
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
    })
  }

  return {
    isValidating,
    data,
    filter,
    mutate,
    updateOrderCustomerPaid,
    navigateToCustomerOrderDetailHistory,
  }
}
