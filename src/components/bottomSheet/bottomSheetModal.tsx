import { COLORS, TYPOGRAPHY } from '@/theme'
import { ForwardModalRef } from '@/types'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal as RBottomSheetModal,
  BottomSheetModalProps as RBottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { BackHandler, Text, View } from 'react-native'

interface BottomSheetModalProps extends Omit<RBottomSheetModalProps, 'snapPoints'> {
  title?: string
}

export const BottomSheetModal = forwardRef<ForwardModalRef, BottomSheetModalProps>(
  ({ children, title, ...attributes }, ref) => {
    const [index, setIndex] = React.useState(-1)
    const sheetRef = useRef<RBottomSheetModal>(null)

    const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT'])

    useImperativeHandle(ref, () => ({
      onClose: closeModal,
      onOpen: openModal,
    }))

    const closeModal = () => {
      sheetRef?.current?.close()
      setIndex(-1)
    }

    const openModal = () => {
      sheetRef.current?.present()
      setIndex(0)
    }

    const handleIndexChange = useCallback((newIndex: number) => {
      setIndex(newIndex)
    }, [])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      ),
      []
    )

    const RenderChildren = () => {
      useEffect(() => {
        const backAction = () => {
          sheetRef?.current?.close()
          return true
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

        return () => backHandler.remove()
      }, [])

      return (
        <BottomSheetView style={{ flex: 1 }} onLayout={handleContentLayout}>
          {title ? (
            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <Text style={TYPOGRAPHY.topBarTitle}>{title}</Text>
            </View>
          ) : null}

          <>{children}</>
        </BottomSheetView>
      )
    }

    return (
      <BottomSheetModalProvider>
        <RBottomSheetModal
          animationConfigs={{ duration: 300 }}
          stackBehavior="replace"
          $modal
          onChange={handleIndexChange}
          index={index}
          ref={sheetRef}
          snapPoints={animatedSnapPoints}
          topInset={0}
          bottomInset={0}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          backdropComponent={renderBackdrop}
          onDismiss={closeModal}
          handleIndicatorStyle={{ backgroundColor: COLORS.gray50 }}
          {...attributes}
        >
          <RenderChildren />
        </RBottomSheetModal>
      </BottomSheetModalProvider>
    )
  }
)
