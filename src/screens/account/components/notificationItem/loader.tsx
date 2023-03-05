import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { styles } from './style'

export const NotificationItemLoading = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder speed={800} borderRadius={4}>
        <>
          <View style={styles.top}>
            <View style={styles.info}>
              <View style={{ width: 36, height: 36, borderRadius: 50, marginRight: 12 }} />
              <View style={{ width: 120, height: 16 }} />
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={{ width: '100%', height: 14 }} />
          </View>
        </>
      </SkeletonPlaceholder>
    </View>
  )
}
