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

interface UseCustomerRouteDetailProps extends CustomerRouteDetailParams {}

export const useCustomerRouteDetail = ({
  customer_id,
  delivery_route_id,
  route_name,
  customer_name,
}: UseCustomerRouteDetailProps) => {
  const { mutate: mutateRouteDetail } = useSWRConfig()
  const routeParams = useFilterSlice((state) => state.routeParams)
  const setRouteParams = useFilterSlice((state) => state.setRouteParams)
  const { asyncHandler } = useAsync()
  const navigation = useNavigation<CustomerRouteDetailNavigation>()
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const { data, mutate, error, isValidating } = useSWR<DetailCustomerRouteRes>(
    delivery_route_id ? SWR_KEY.customer_route_detail(customer_id) : null,
    () =>
      deliveryAPI
        .getCustomerRouteDetail({ customer_id, delivery_route_id, ...routeParams })
        .then((res) => res?.data)
  )

  const filter = (params: DateFilter | undefined) => {
    setRouteParams(params)
    asyncHandler({
      fetcher: deliveryAPI.getCustomerRouteDetail({ customer_id, delivery_route_id, ...params }),
      config: { showSuccessMsg: false, showErrorMsg: false },
      onSuccess: (res) => mutate(res, false),
      onError: () => mutate(undefined, false),
    })
  }

  const fetchCustomerRouteDetail = async (
    loading = true
  ): Promise<DetailCustomerRouteRes | undefined> => {
    try {
      loading && setBackdropVisible(true)
      const res = await deliveryAPI.getCustomerRouteDetail({
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

  const navigateToRouteDetail = () => {
    navigation.navigate({
      name: 'RouteDetail',
      params: { delivery_route_id, route_name },
      merge: true,
    })
  }

  const navigateToCustomerOrderDetail = (data: OrderRes) => {
    navigation.navigate('CustomerOrderDetail', {
      customer_id,
      delivery_route_id,
      customer_name,
      order_code: data?.order_code || data?.order_name,
      export_stock_order_id: data.id,
      route_name,
    })
  }

  const mutateRouteDetailState = () => {
    mutateRouteDetail(SWR_KEY.route_detail(delivery_route_id))
  }

  const startDeliveryCustomerOrder = () => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.changeCustomerRouteOrderToStart({
        customer_id: customer_id,
        delivery_route_id,
      }),
      config: {
        successMsg: 'Đã bắt đầu giao hàng cho khách hàng',
        showBackdrop: false,
      },
      onSuccess: async () => {
        mutateRouteDetailState()
        const data = await fetchCustomerRouteDetail()
        mutate(data, false)
      },
    })
  }

  const cancelAllCustomerOrder = async () => {
    asyncHandler({
      fetcher: deliveryAPI.cancelAllCustomerRouteOrder({
        customer_id: customer_id,
        delivery_route_id,
      }),
      onSuccess: () => {
        mutateRouteDetailState()
        navigateToRouteDetail()
      },
      config: {
        successMsg: `Đã hủy toàn bộ đơn hàng của khách hàng ${data?.name}`,
      },
    })
  }

  const confirmAllCustomerOrder = () => {
    if (!data?.id || !delivery_route_id) return

    asyncHandler({
      fetcher: deliveryAPI.confirmDoneCustomerRouteOrder({
        customer_id: data.id,
        delivery_route_id,
      }),
      onSuccess: () => {
        mutateRouteDetailState()
        navigateToRouteDetail()
      },
      config: {
        successMsg: 'Đã hoàn thành tất cả đơn hàng của khách hàng này',
      },
    })
  }

  const cancelCustomerOrder = (params: OrderRes) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.cancelCustomerRouteOrder({
        export_stock_order_id: params.id,
      }),
      onSuccess: async () => {
        const data = await fetchCustomerRouteDetail()
        mutateRouteDetailState()
        if ((data?.sale_orders?.length || 0) === 0) {
          navigateToRouteDetail()
        } else {
          mutate(data, false)
        }
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
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
        mutateRouteDetailState()
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
    error,
    filter,
    mutate,
    cancelCustomerOrder,
    confirmAllCustomerOrder,
    startDeliveryCustomerOrder,
    updateOrderCustomerPaid,
    cancelAllCustomerOrder,
    navigateToRouteDetail,
    navigateToCustomerOrderDetail,
  }
}
