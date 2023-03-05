import { CheckIcon } from '@/assets'
import { COLORS, TYPOGRAPHY } from '@/theme'
import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle, TouchableHighlight } from 'react-native'

interface TextItemProps {
  onPress?: Function
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  active?: boolean
  title: string
  leftChild?: JSX.Element
}

export const TextItem = ({
  onPress,
  style: externalStyles,
  textStyle,
  active,
  title,
  leftChild,
}: TextItemProps) => {
  return (
    <TouchableHighlight
      underlayColor={COLORS.bg}
      onPress={() => onPress?.()}
      style={[
        styles.container,
        { borderBottomColor: COLORS.gray10, borderBottomWidth: 1 },
        active && { backgroundColor: COLORS.bg },
        externalStyles,
      ]}
    >
      <>
        {leftChild}

        <Text
          style={[
            styles.text,
            leftChild && { marginLeft: 12 },
            active && { color: COLORS.primary },
            textStyle,
          ]}
        >
          {title}
        </Text>

        {active ? (
          <View style={{ marginLeft: 12 }}>{<CheckIcon fill={COLORS.primary} />}</View>
        ) : null}
      </>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { ...TYPOGRAPHY.sm, flex: 1 },
})
