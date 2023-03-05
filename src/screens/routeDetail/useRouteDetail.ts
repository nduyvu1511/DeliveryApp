import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { deliveryAPI } from '@/services'
import { useCommonSlice, useFilterSlice } from '@/store'
import {
  CustomerOrderDetailNavigation,
  CustomerRouteRes,
  DateFilter,
  GetRouteDetailRes,
  RouteDetailParams,
} from '@/types'
import { useNavigation } from '@react-navigation/native'
import useSWR, { SWRResponse } from 'swr'

interface UseRouteDetailRes extends SWRResponse<GetRouteDetailRes | undefined, any> {
  startCustomerRoute: (data: CustomerRouteRes) => void
  navigateToRouteOrderDetail: (data: CustomerRouteRes) => void
  filter: (params: DateFilter | undefined) => void
}

export const useRouteDetail = ({
  delivery_route_id,
  route_name,
}: RouteDetailParams): UseRouteDetailRes => {
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const routeParams = useFilterSlice((state) => state.routeParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteParams)
  const navigation = useNavigation<CustomerOrderDetailNavigation>()
  const { asyncHandler } = useAsync()
  const { data, isValidating, mutate, error } = useSWR<GetRouteDetailRes | undefined>(
    SWR_KEY.route_detail(delivery_route_id),
    () =>
      deliveryAPI
        .getRouteDetail({ delivery_route_id: delivery_route_id, ...routeParams })
        .then((res) => res?.data)
  )

  const filter = (params: DateFilter | undefined) => {
    setRouteParams(params)
    asyncHandler({
      fetcher: deliveryAPI.getRouteDetail({ delivery_route_id: delivery_route_id, ...params }),
      config: { showSuccessMsg: false, showErrorMsg: false },
      onSuccess: (res) => mutate(res, false),
      onError: () => mutate(undefined, false),
    })
  }

  const navigateToRouteOrderDetail = (params: CustomerRouteRes) => {
    if (!data) return

    navigation.navigate({
      name: 'CustomerRouteDetail',
      params: {
        delivery_route_id: params.delivery_route_id,
        customer_id: params.id,
        customer_name: params.name,
        route_name: route_name,
      },
      merge: true,
    })
  }

  const fetchRouteDetail = async (): Promise<GetRouteDetailRes | undefined> => {
    try {
      setBackdropVisible(true)
      const res = await deliveryAPI.getRouteDetail({
        delivery_route_id: delivery_route_id,
        ...routeParams,
      })
      setBackdropVisible(false)
      return res?.data
    } catch (error) {
      setBackdropVisible(false)
      return undefined
    }
  }

  const startCustomerRoute = (data: CustomerRouteRes) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.changeCustomerRouteOrderToStart({
        customer_id: data.id,
        delivery_route_id: data.delivery_route_id,
      }),
      onSuccess: async () => {
        const res = await fetchRouteDetail()
        mutate(res, false)
        navigateToRouteOrderDetail(data)
      },
      onError: () => setBackdropVisible(false),
      config: { showSuccessMsg: false, showBackdrop: false },
    })
  }

  return {
    isValidating,
    data,
    error,
    mutate,
    navigateToRouteOrderDetail,
    startCustomerRoute,
    filter,
  }
}
