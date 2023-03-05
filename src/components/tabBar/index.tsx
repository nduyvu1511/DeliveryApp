import { ArrowLeftIcon, ThreeDotsIcon } from '@/assets'
import { COLORS } from '@/theme'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ViewStyle } from 'react-native'
import { Text, TouchableHighlight, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style'

interface TabBarProps {
  headerLeft?: JSX.Element
  headerCenter?: JSX.Element
  title?: string
  headerRightIcon?: JSX.Element
  headerRight?: JSX.Element
  showHeaderLeft?: boolean
  onHeaderRightClick?: Function
  headerLeftIcon?: JSX.Element
  style?: ViewStyle | ViewStyle[]
}

export const TabBar = ({
  headerCenter,
  headerLeft,
  showHeaderLeft = true,
  title,
  headerRightIcon,
  onHeaderRightClick,
  headerRight,
  headerLeftIcon,
  style,
}: TabBarProps) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }} edges={['top']}>
      <View style={[styles.header, style]}>
        <View style={styles.left}>
          {showHeaderLeft
            ? headerLeft || (
                <TouchableHighlight
                  onPress={() => navigation.goBack()}
                  underlayColor={COLORS.gray20}
                  style={styles.button}
                >
                  {headerLeftIcon || <ArrowLeftIcon fill={COLORS.gray70} />}
                </TouchableHighlight>
              )
            : null}
        </View>

        <View style={styles.middle}>
          {headerCenter ? (
            headerCenter
          ) : (
            <Text numberOfLines={1} style={styles.title}>
              {title || ''}
            </Text>
          )}
        </View>

        <View style={[styles.right, title ? { width: 40 } : undefined]}>
          {headerRight ? (
            headerRight
          ) : onHeaderRightClick ? (
            <TouchableHighlight
              onPress={() => onHeaderRightClick?.()}
              underlayColor={COLORS.gray20}
              style={styles.button}
            >
              {headerRightIcon || <ThreeDotsIcon fill={COLORS.gray70} />}
            </TouchableHighlight>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}
