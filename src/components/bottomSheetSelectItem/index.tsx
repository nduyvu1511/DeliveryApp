import { BottomSheet, BottomSheetProps, TextItem } from '@/components'
import { ForwardModalRef, IdAndName } from '@/types'
import React, { forwardRef } from 'react'
import { ScrollView, TextStyle, ViewStyle } from 'react-native'

type BottomSheetSelectItemProps = Partial<BottomSheetProps> & {
  data: IdAndName[]
  activeId?: number | string
  title?: string
  onClose?: Function
  onChange?: (_: IdAndName) => void
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
}

export const BottomSheetSelectItem = forwardRef<ForwardModalRef, BottomSheetSelectItemProps>(
  (
    { data: dataProps, onChange, activeId, title, onClose, style, textStyle, ...attributes },
    ref
  ) => {
    return (
      <BottomSheet title={title} ref={ref} {...attributes}>
        <ScrollView style={{ flex: 1 }}>
          {dataProps.map((item, index) => (
            <TextItem
              textStyle={textStyle}
              style={[
                index === dataProps?.length - 1 ? { borderBottomWidth: 0 } : {},
                (style = {}),
              ]}
              key={item.id}
              title={item.name}
              active={item.id === activeId}
              onPress={() => {
                onClose?.()
                if (item.id === activeId) return
                onChange?.(item)
              }}
            />
          ))}
        </ScrollView>
      </BottomSheet>
    )
  }
)
