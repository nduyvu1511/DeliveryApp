import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { deliveryAPI } from '@/services'
import { useCommonSlice } from '@/store'
import {
  CustomerOrderDetailParams,
  GetCustomerOrderDetailRes,
  UpdateCustomerOrderQtyReturned,
  UpdateOrderCustomerPaid,
} from '@/types'
import useSWR, { useSWRConfig } from 'swr'

export const useCustomerOrderDetailHistory = (params: CustomerOrderDetailParams) => {
  const { asyncHandler } = useAsync()
  const { mutate } = useSWRConfig()
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const swr = useSWR(`customer_order_detail_history_${params.export_stock_order_id}`, () =>
    deliveryAPI
      .getCustomerOrderDetailHistory({ export_stock_order_id: params.export_stock_order_id })
      .then((res) => res?.data)
  )

  const fetchCustomerOrderDetail = async (): Promise<GetCustomerOrderDetailRes | undefined> => {
    try {
      setBackdropVisible(true)
      const res = await deliveryAPI.getCustomerOrderDetailHistory({
        export_stock_order_id: params.export_stock_order_id,
      })
      setBackdropVisible(false)
      return res?.data
    } catch (error) {
      setBackdropVisible(false)
      return undefined
    }
  }

  const mutateCustomerRouteDetailState = () => {
    mutate(SWR_KEY.customer_route_detail_history(params.customer_id))
  }

  const updateOrderCustomerPaid = (params: UpdateOrderCustomerPaid) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.updateOrderCustomerPaid(params),
      onSuccess: async () => {
        mutateCustomerRouteDetailState()
        const data = await fetchCustomerOrderDetail()
        swr.mutate(data, false)
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
    })
  }

  const updateCustomerOrder = (data: UpdateCustomerOrderQtyReturned) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.updateCustomerRouteOrder({
        export_stock_order_id: params.export_stock_order_id,
        export_stock_order_line_id: data.id,
        qty_returned: data.qty_returned,
        uom_id: data.uom_id,
      }),
      onSuccess: async () => {
        mutateCustomerRouteDetailState()
        const data = await fetchCustomerOrderDetail()
        swr.mutate(data, false)
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
    })
  }

  return {
    ...swr,
    updateCustomerOrder,
    fetchCustomerOrderDetail,
    updateOrderCustomerPaid,
  }
}
