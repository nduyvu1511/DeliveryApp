import { RenderListQuery, TabBar } from '@/components'
import {
  CustomerOrderDetailHeader,
  OrderDetailButtonActions,
  ProductItem,
  ProductItemLoading,
} from '@/screens'
import { COMMON_STYLES } from '@/theme'
import { StackParamsList } from '@/types'
import { RouteProp, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import { styles } from './style'
import { useCustomerOrderDetail } from './useCustomerOrderDetail'

export const CustomerOrderDetailScreen = () => {
  const { params } = useRoute<RouteProp<StackParamsList, 'CustomerOrderDetail'>>()

  const {
    data,
    isValidating,
    cancelCustomerOrder,
    mutate,
    setProductQtyReturned,
    updateOrderCustomerPaid,
    addImageToOrder,
  } = useCustomerOrderDetail(params)

  return (
    <>
      <TabBar title={params?.order_code} />

      <View style={styles.container}>
        <RenderListQuery
          isValidating={isValidating}
          onRefresh={mutate}
          ListHeaderLoadingComponent={ProductItemLoading}
          LoadingComponent={ProductItemLoading}
          data={data?.sale_order_line}
          ListHeaderComponent={
            <CustomerOrderDetailHeader
              readOnly={!!params?.screen}
              style={{ marginTop: 12 }}
              data={data}
              onConfirm={updateOrderCustomerPaid}
            />
          }
          renderItem={({ item }) => (
            <ProductItem
              onChange={setProductQtyReturned}
              readOnly={!!params?.screen || data?.state === 'done'}
              data={item}
            />
          )}
        />

        {!params?.screen && !isValidating && data?.sale_order_line?.length ? (
          <View style={COMMON_STYLES.buttonBottom}>
            <OrderDetailButtonActions
              rightBtnLabel={`Chụp hình (${data?.image_url?.length || 0})`}
              onCancel={cancelCustomerOrder}
              onConfirm={addImageToOrder}
            />
          </View>
        ) : null}
      </View>
    </>
  )
}
