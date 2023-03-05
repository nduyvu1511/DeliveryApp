import { SIZE } from '@/theme'
import React, { useRef } from 'react'
import { Animated, PanResponder, View } from 'react-native'
import { styles } from './style'

const MAX_DOWNWARD_TRANSLATE_Y = 0
const DRAG_THRESHOLD = 50

interface DraggableBottomSheet {
  minHeight?: number
  maxHeight?: number
  children: JSX.Element
}

export const DraggableBottomSheet = ({
  maxHeight = 0.6,
  minHeight = 0.1,
  children,
}: DraggableBottomSheet) => {
  const BOTTOM_SHEET_MAX_HEIGHT = maxHeight > 1 ? maxHeight : SIZE.windowHeight * maxHeight
  const BOTTOM_SHEET_MIN_HEIGHT = minHeight > 1 ? minHeight : SIZE.windowHeight * minHeight
  const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT // negative number;

  const animatedValue = useRef(new Animated.Value(0)).current
  const lastGestureDy = useRef(0)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current)
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy)
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset()
        lastGestureDy.current += gesture.dy
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up')
          } else {
            springAnimation('down')
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down')
          } else {
            springAnimation('up')
          }
        }
      },
    })
  ).current

  const springAnimation = (direction: 'up' | 'down') => {
    console.log('direction', direction)
    lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start()
  }

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: BOTTOM_SHEET_MAX_HEIGHT,
            bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
          },
          bottomSheetAnimation,
        ]}
      >
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle} />
        </View>

        {children}
      </Animated.View>
    </View>
  )
}
