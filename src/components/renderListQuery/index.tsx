import { QueryList, UseQueryListRes } from '@/types'
import React from 'react'
import { FlatList, FlatListProps, ListRenderItem, StyleSheet, View, ViewStyle } from 'react-native'
import { EmptyRecord, EmptyRecordProps } from '../empty'
import { Spinner } from '../loading'

type RenderListQueryProps<Data = any, Params extends QueryList = any> = Partial<
  UseQueryListRes<Data, Params>
> &
  Partial<FlatListProps<Data>> & {
    renderItem: ListRenderItem<Data>
    ListHeaderLoadingComponent?: (_: any) => JSX.Element
    LoadingComponent?: (_: any) => JSX.Element
    containerStyle?: ViewStyle | ViewStyle[]
    showListHeaderWhenLoading?: boolean
    emptyComponentProps?: EmptyRecordProps
  }

export const RenderListQuery = <Data = any, Params extends QueryList = any>({
  data,
  hasMore,
  emptyComponentProps,
  ListHeaderComponent,
  ListHeaderLoadingComponent,
  LoadingComponent,
  renderItem,
  containerStyle,
  showListHeaderWhenLoading = true,
  ...attributes
}: RenderListQueryProps<Data, Params>): JSX.Element => {
  const RenderLoading = ({ length = 8 }) => {
    if (!LoadingComponent) return <Spinner />

    return (
      <>
        {Array.from({ length }).map((_, index) => (
          <View style={[{ marginBottom: 12, marginTop: index === 0 ? 12 : 0 }]} key={index}>
            <LoadingComponent />
          </View>
        ))}
      </>
    )
  }

  if (attributes?.isValidating) {
    return (
      <View style={[styles.container, containerStyle]}>
        <>
          {ListHeaderLoadingComponent ? (
            <View style={{ marginTop: 12 }}>
              <ListHeaderLoadingComponent />
            </View>
          ) : (
            ListHeaderComponent || null
          )}
        </>
        <RenderLoading />
      </View>
    )
  }

  return (
    <FlatList
      style={[styles.container, containerStyle]}
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        hasMore ? (
          <View style={{ marginTop: -12 }}>
            <RenderLoading length={2} />
          </View>
        ) : null
      }
      onEndReachedThreshold={0.4}
      refreshing={false}
      ListEmptyComponent={<EmptyRecord {...emptyComponentProps} />}
      onRefresh={() => attributes?.refresh?.()}
      onEndReached={() => attributes?.fetchMore?.()}
      renderItem={(props) => (
        <View style={[{ marginBottom: 12, marginTop: props.index === 0 ? 12 : 0 }]}>
          {renderItem(props)}
        </View>
      )}
      {...attributes}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
