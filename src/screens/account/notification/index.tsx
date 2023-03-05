import { ThreeDotsIcon, TrashIcon } from '@/assets'
import { BottomSheetSelectItem, Button, EmptyRecord, TabBar } from '@/components'
import { COLORS, TYPOGRAPHY } from '@/theme'
import { ForwardModalRef } from '@/types'
import { useRef } from 'react'
import { FlatList, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { NotificationItem } from '../components'
import { DATA, DataType } from './data'
import { styles } from './style'

export const NotificationScreen = () => {
  const ref = useRef<ForwardModalRef>(null)
  let row: Array<Swipeable | null> = []
  let prevOpenedRow: Swipeable | null

  const deleteItem = (id: number) => {}

  const renderItem = ({ item, index }: { item: DataType; index: number }, onClick: Function) => {
    const closeRow = (index: number) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close()
      }
      prevOpenedRow = row[index]
    }

    const renderRightActions = (onClick: any) => {
      return (
        <View style={{ width: 70 }}>
          <Button
            style={{ flex: 1, padding: 12, backgroundColor: COLORS.red, borderRadius: 0 }}
            onPress={onClick}
            icon={<TrashIcon fill={COLORS.white} />}
          />
        </View>
      )
    }

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(onClick)}
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
      >
        <NotificationItem data={item} />
      </Swipeable>
    )
  }

  return (
    <>
      <TabBar
        title="Thông báo"
        // headerRightIcon={<ThreeDotsIcon />}
        // onHeaderRightClick={() => {
        //   ref?.current?.onOpen()
        // }}
      />

      <View style={styles.container}>
        <EmptyRecord title='Không có thông báo nào'/>
        {/* <FlatList
          data={DATA}
          renderItem={(v) => renderItem(v, () => deleteItem(v.item.id))}
          keyExtractor={(item) => item.id + ''}
        /> */}
      </View>

      <BottomSheetSelectItem
        style={{ paddingVertical: 16 }}
        textStyle={{
          textAlign: 'center',
          ...TYPOGRAPHY.base,
          color: COLORS.primary,
        }}
        height={110}
        onClose={() => ref?.current?.onClose()}
        ref={ref}
        data={[
          { id: 1, name: 'Đánh dấu đọc tất cả' },
          { id: 2, name: 'Xóa tất cả' },
        ]}
      />
    </>
  )
}
