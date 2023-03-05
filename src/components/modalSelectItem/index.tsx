import { SearchInput, Spinner, TextItem } from '@/components'
import { convertViToEn } from '@/helpers'
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme'
import { IdAndName } from '@/types'
import React, { useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from './style'

export interface ModalSelectItemProps {
  data: IdAndName[] | undefined
  isLoading?: boolean
  activeId?: number | undefined
  title: string
  onChange?: (_: IdAndName) => void
}

export const ModalSelectItem = ({
  data,
  isLoading,
  title,
  activeId,
  onChange,
}: ModalSelectItemProps) => {
  const ref = useRef<FlatList>(null)
  const [list, setList] = useState<IdAndName[]>(data || [])

  const handleSearchList = (val: string) => {
    if (!data?.length) return
    if (!val) {
      setList([...data])
    } else {
      setList(
        [...data]?.filter((item) => convertViToEn(item.name)?.includes(convertViToEn(val))) || []
      )
    }
  }

  const renderView = () => {
    if (isLoading) return <Spinner />

    if (!list?.length)
      return (
        <Text style={[TYPOGRAPHY.smNormal, { textAlign: 'center', paddingVertical: 16 }]}>
          Không có dữ liệu
        </Text>
      )

    return (
      <FlatList
        ref={ref}
        initialScrollIndex={
          list?.length > 10
            ? activeId && list?.findIndex((item) => item.id === activeId)
            : undefined
        }
        data={list}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          ref.current?.scrollToOffset({
            offset: averageItemLength * index,
            animated: true,
          })
        }}
        renderItem={({ item }) => (
          <TextItem
            style={{ paddingVertical: 14 }}
            title={item.name}
            onPress={() => item.id !== activeId && onChange?.(item)}
            active={item.id === activeId}
          />
        )}
      />
    )
  }

  return (
    <View style={{ borderRadius: SPACING.md, height: '100%', flex: 1 }}>
      <View>
        <View style={styles.header}>
          <Text style={[TYPOGRAPHY.modalTitle]}>{title}</Text>
        </View>

        <View style={{ borderBottomColor: COLORS.gray10, borderBottomWidth: 1 }}>
          <SearchInput onChangeText={handleSearchList} showDebounceTimer={false} />
        </View>
      </View>

      <View style={{ flex: 1 }}>{renderView()}</View>
    </View>
  )
}
