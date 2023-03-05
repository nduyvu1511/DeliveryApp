import { ClockIcon } from '@/assets'
import { Avatar } from '@/components'
import React from 'react'
import { Text, View } from 'react-native'
import { DataType } from '../../notification/data'
import { styles } from './style'

interface NotificationItemProps {
  data: DataType
}

export const NotificationItem = ({ data }: NotificationItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.info}>
          <Avatar size={32} url="" />
          <Text style={styles.title}>{data.title}</Text>
        </View>

        <View style={styles.date}>
          <View style={styles.dateIcon}>
            <ClockIcon size={14} />
          </View>
          <Text style={styles.dateText}>19:19, 9/9/2022</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text numberOfLines={2} style={styles.contentText}>
          {data.desc}
        </Text>
      </View>
    </View>
  )
}
