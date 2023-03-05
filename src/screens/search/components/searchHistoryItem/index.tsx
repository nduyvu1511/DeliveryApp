import { ClockIcon, CloseIcon } from '@/assets'
import React from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'
import { styles } from './style'

interface SearchHistoryItemProps {
  onDelete?: () => void
  onPress?: () => void
  style?: ViewStyle | ViewStyle[]
}

export const SearchHistoryItem = ({ onDelete, onPress, style }: SearchHistoryItemProps) => {
  return (
    <Pressable onPress={() => onPress?.()} style={[styles.container, style]}>
      <>
        <View style={styles.content}>
          <ClockIcon />

          <Text style={styles.contentText}>Tạp hoá thanh tâm</Text>
        </View>

        <Pressable onPress={() => onDelete?.()} style={styles.deleteBtn}>
          <CloseIcon size={10} />
        </Pressable>
      </>
    </Pressable>
  )
}
