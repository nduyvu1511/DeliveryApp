import { CloseIcon } from '@/assets'
import { ForwardModalRef } from '@/types'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Dimensions, Pressable, Text, View, ViewStyle } from 'react-native'
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style'

const HEIGHT = Dimensions.get('window').height

export type BottomSheetProps = Omit<RBSheetProps, 'onClose'> & {
  children: JSX.Element | JSX.Element[]
  title?: string
  titleRight?: string
  onTitleRightPress?: Function
  containerStyle?: ViewStyle | ViewStyle[]
  height?: number // Truyền từ 0 -> 1 thì sẽ set theo % của screen, lơn hơn 1 thì sẽ lấy luôn giá trị đó
  showIcon?: boolean
  onClose?: Function
}

export const BottomSheet = forwardRef<ForwardModalRef, BottomSheetProps>(
  (
    {
      title,
      children,
      titleRight,
      onTitleRightPress,
      height = 0.4,
      containerStyle,
      showIcon,
      onClose,
      ...attributes
    },
    ref
  ) => {
    const refRBSheet = useRef<RBSheet>(null)

    useImperativeHandle(
      ref,
      () => ({
        onClose: () => refRBSheet?.current?.close(),
        onOpen: () => refRBSheet?.current?.open(),
      }),
      [refRBSheet]
    )

    return (
      <RBSheet
        closeOnPressBack
        height={height > 1 ? height : HEIGHT * height}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeDuration={250}
        openDuration={300}
        closeOnPressMask={true}
        animationType="fade"
        customStyles={{
          wrapper: styles.wrapper,
          container: { ...styles.container, ...containerStyle },
          draggableIcon: { ...styles.draggableIcon, display: !showIcon ? 'none' : 'flex' },
        }}
        {...attributes}
      >
        <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
          {title ? (
            <View style={styles.header}>
              <Text numberOfLines={1} style={[styles.headerTitle]}>
                {title}
              </Text>

              {onClose ? (
                <Pressable style={{ marginLeft: 12 }} onPress={() => onClose?.()}>
                  <CloseIcon />
                </Pressable>
              ) : null}
            </View>
          ) : null}

          <View style={{ flex: 1 }}>{children}</View>
        </SafeAreaView>
      </RBSheet>
    )
  }
)

export * from './bottomSheetModal'
