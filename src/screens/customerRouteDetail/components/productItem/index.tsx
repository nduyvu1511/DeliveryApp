import { emptyIcon, imageBlur } from '@/assets'
import { InputSelectModalUnit, InputSelectNumber, Paper } from '@/components'
import { formatMoneyVND, toImageUrl } from '@/helpers'
import { COMMON_STYLES } from '@/theme'
import { IdAndName, OrderLineProductRes, UpdateCustomerOrderQtyReturned } from '@/types'
import React, { useEffect, useState } from 'react'
import { Image, Text, View, ViewStyle } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { styles } from './style'

interface ProductItemProps {
  style?: ViewStyle | ViewStyle[]
  data: OrderLineProductRes
  readOnly?: boolean
  onChange?: (_: UpdateCustomerOrderQtyReturned) => void
}

export const ProductItem = ({ data, style, readOnly, onChange }: ProductItemProps) => {
  const [unit, setUnit] = useState<IdAndName>(
    data?.product_uom_return?.id ? data.product_uom_return : data?.product_uom
  )
  const [qtyReturned, setQtyReturned] = useState<number>(
    data?.quantity_returned_uom || data?.quantity_returned
  )
  const [limit, setLimit] = useState<number>(
    data?.product_uom_return?.id ? getLimit(data.product_uom_return) || 0 : data?.product_uom_qty
  )

  useEffect(() => {
    const qtyReturned = data?.quantity_returned_uom
    if (!qtyReturned || qtyReturned === data.quantity_returned) return

    setQtyReturned(qtyReturned)
  }, [data?.quantity_returned_uom])

  const setProductQuantityReturned = (qty_returned: number) => {
    if (qty_returned === data.quantity_returned_uom && unit.id === data.product_uom_return.id)
      return

    onChange?.({ ...data, qty_returned, uom_id: (unit?.id || data?.product_uom?.id) as number })
  }

  function getLimit(val: IdAndName, cb?: (qty: number) => void) {
    const productUoms = data?.product_uom_categ
    if (productUoms?.length) {
      const currentUnit = productUoms.find((item) => item.id === val.id)
      const originalUnit = productUoms.find((item) => item.id === data.product_uom.id)

      if (currentUnit?.id && originalUnit?.id) {
        const newLimit = Math.floor(
          (originalUnit?.inv / currentUnit?.inv || 0) * data?.product_uom_qty
        )
        cb?.(newLimit)
        return newLimit
      }
    }
  }

  const selectUnit = (val: IdAndName) => {
    setUnit(val)
    getLimit(val, (qty) => {
      setLimit(qty)
      setQtyReturned(0)
    })
  }

  return (
    <Paper style={style}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            loadingIndicatorSource={{ uri: imageBlur }}
            source={data.image ? { uri: toImageUrl(data.image) } : emptyIcon}
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.contentName} numberOfLines={2}>
            {data.name}
          </Text>

          <View style={{ ...COMMON_STYLES.flexRowSpaceBetween, marginBottom: 8 }}>
            <Text style={styles.contentText} numberOfLines={1}>
              Số lượng: {data.product_uom_qty} {data.product_uom.name}
            </Text>
            <Text numberOfLines={1} style={styles.contentMoneyText}>
              {formatMoneyVND(data.price)}
            </Text>
          </View>

          <InputSelectModalUnit
            style={{ marginBottom: 14 }}
            title="Đơn vị"
            label="Đơn vị:"
            value={unit.name}
            data={data?.product_uom_categ}
            activeId={unit?.id as number}
            labelStyle={styles.contentText}
            onChange={selectUnit}
            readOnly={readOnly}
          />

          <InputSelectNumber
            readOnly={readOnly}
            value={qtyReturned}
            title="Số lượng trả:"
            label="Số lượng trả"
            limit={limit}
            labelStyle={styles.contentText}
            onConfirm={(val) => setProductQuantityReturned(val.value)}
          />
        </View>
      </View>
    </Paper>
  )
}

export const ProductItemLoading = ({ style }: { style?: ViewStyle }) => {
  return (
    <Paper style={style}>
      <SkeletonPlaceholder speed={800} borderRadius={4}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 100, height: 100 }} />

          <View
            style={{
              flex: 1,
              marginLeft: 12,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ marginBottom: 8, height: 16, width: '100%' }} />
            <View style={{ marginBottom: 8, height: 10, width: '60%' }} />
            <View style={{ marginBottom: 8, height: 10, width: '60%' }} />
            <View style={{ marginBottom: 12, height: 10, width: '60%' }} />

            <View style={COMMON_STYLES.flexRowSpaceBetween}>
              <View style={{ width: 40, height: 10 }} />
              <View style={{ width: 120, height: 20 }} />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </Paper>
  )
}
