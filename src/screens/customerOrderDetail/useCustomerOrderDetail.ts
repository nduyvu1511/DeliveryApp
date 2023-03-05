import { SWR_KEY } from '@/constants'
import { useAsync } from '@/hooks'
import { deliveryAPI } from '@/services'
import { useCommonSlice } from '@/store'
import {
  CustomerOrderDetailNavigation,
  CustomerOrderDetailParams,
  GetCustomerOrderDetailRes,
  OrderLineProductRes,
  StackParamsListKey,
  UpdateCustomerOrderQtyReturned,
  UpdateOrderCustomerPaid,
} from '@/types'
import { useNavigation } from '@react-navigation/native'
import ImagePicker, { Image } from 'react-native-image-crop-picker'
import useSWR, { SWRResponse, useSWRConfig } from 'swr'

interface UseCustomerOrderDetailProps extends CustomerOrderDetailParams {
  screen?: StackParamsListKey
}

interface UseCustomerOrderDetailRes extends SWRResponse<GetCustomerOrderDetailRes, any> {
  setProductQtyReturned: (
    product: OrderLineProductRes & {
      qty_returned: number
      uom_id: number
    }
  ) => void
  updateOrderCustomerPaid: (params: UpdateOrderCustomerPaid) => void
  cancelCustomerOrder: () => void
  handleNavigate: () => void
  addImageToOrder: () => void
}

export const useCustomerOrderDetail = (
  params: UseCustomerOrderDetailProps
): UseCustomerOrderDetailRes => {
  const { mutate: mutateCustomerRouteDetail } = useSWRConfig()
  const { asyncHandler } = useAsync()
  const navigation = useNavigation<CustomerOrderDetailNavigation>()
  const setBackdropVisible = useCommonSlice((state) => state.setBackdropVisible)
  const { data, isValidating, error, mutate } = useSWR(
    `customer_order_${params.export_stock_order_id}`,
    () =>
      deliveryAPI
        .getCustomerOrderDetail({ export_stock_order_id: params.export_stock_order_id })
        .then((res) => res?.data)
  )

  const fetchCustomerOrderDetail = async (
    loading = true
  ): Promise<GetCustomerOrderDetailRes | undefined> => {
    try {
      loading && setBackdropVisible(true)
      const res = await deliveryAPI.getCustomerOrderDetail(params)
      loading && setBackdropVisible(false)
      return res?.data
    } catch (error) {
      loading && setBackdropVisible(false)
      return undefined
    }
  }

  const handleNavigate = () => {
    if (params?.screen === 'ScanOrderReceived' || params?.screen === 'SearchOrderReceived') {
      navigation.goBack()
    } else {
      navigation.navigate({ name: 'CustomerRouteDetail', params, merge: true })
    }
  }

  const mutateCustomerRouteDetailState = () => {
    mutateCustomerRouteDetail(SWR_KEY.customer_route_detail(params.customer_id))
  }

  const setProductQtyReturned = (product: UpdateCustomerOrderQtyReturned) => {
    setBackdropVisible(true)
    console.log(product.qty_returned, product.uom_id)
    asyncHandler({
      fetcher: deliveryAPI.updateCustomerRouteOrder({
        export_stock_order_id: params.export_stock_order_id,
        export_stock_order_line_id: product.id,
        qty_returned: product.qty_returned,
        uom_id: product.uom_id,
      }),
      onSuccess: async () => {
        mutateCustomerRouteDetailState()
        const data = await fetchCustomerOrderDetail()
        mutate(data, false)
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
    })
  }

  const updateOrderCustomerPaid = (params: UpdateOrderCustomerPaid) => {
    setBackdropVisible(true)
    asyncHandler({
      fetcher: deliveryAPI.updateOrderCustomerPaid(params),
      onSuccess: async () => {
        mutateCustomerRouteDetailState()
        const data = await fetchCustomerOrderDetail()
        mutate(data, false)
      },
      onError: () => setBackdropVisible(false),
      config: {
        showSuccessMsg: false,
        showBackdrop: false,
      },
    })
  }

  const addImageToOrder = async () => {
    if (!data?.id) return

    try {
      const res: Image = await ImagePicker.openCamera({
        cropping: false,
        includeBase64: true,
      })
      if (!res?.data) return

      asyncHandler({
        fetcher: deliveryAPI.addImageForDeliveryOrder({
          export_stock_order_ids: [data.id],
          images: res.data as string,
        }),
        onSuccess: handleNavigate,
        config: {
          successMsg: 'Thêm hình ảnh thành công',
        },
      })
    } catch (error) {}
  }

  const cancelCustomerOrder = () => {
    asyncHandler({
      fetcher: deliveryAPI.cancelCustomerRouteOrder({
        export_stock_order_id: params.export_stock_order_id,
      }),
      onSuccess: () => {
        mutateCustomerRouteDetailState()
        handleNavigate()
      },
      config: {
        successMsg: 'Hủy đơn hàng thành công',
      },
    })
  }

  return {
    data,
    error,
    isValidating,
    mutate,
    addImageToOrder,
    cancelCustomerOrder,
    setProductQtyReturned,
    updateOrderCustomerPaid,
    handleNavigate,
  }
}
