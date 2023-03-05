import { emptyIcon, imageBlur } from '@/assets'
import { COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React from 'react'
import { Image, Text, View, ViewStyle } from 'react-native'
import { Button } from '../button'

export interface EmptyRecordProps {
  title?: string
  children?: JSX.Element
  source?: string
  containerStyle?: ViewStyle
  titleBtn?: string
  onBtnPress?: Function
}

export const EmptyRecord = ({
  title = 'Không có dữ liệu',
  children,
  source,
  containerStyle,
  titleBtn,
  onBtnPress,
}: EmptyRecordProps) => {
  return (
    <View style={[COMMON_STYLES.flexCenter, { paddingVertical: 24 }, containerStyle]}>
      <Image
        loadingIndicatorSource={{ uri: imageBlur }}
        style={{ resizeMode: 'contain', width: 200, height: 200, marginBottom: 12 }}
        source={source || emptyIcon}
      />

      <Text style={TYPOGRAPHY.base}>{title}</Text>

      {titleBtn ? (
        <Button style={{ marginTop: 24 }} onPress={() => onBtnPress?.()} title={titleBtn} />
      ) : null}
      {children}
    </View>
  )
}
