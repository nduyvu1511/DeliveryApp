import { Paper } from '@/components'
import { COMMON_STYLES } from '@/theme'
import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export const CustomerItemLoading = () => {
  return (
    <Paper>
      <SkeletonPlaceholder speed={800} borderRadius={4}>
        <>
          <View style={[COMMON_STYLES.flexRowSpaceBetween, { marginBottom: 16 }]}>
            <View style={COMMON_STYLES.flexRowCenter}>
              <View style={{ width: 40, height: 40, borderRadius: 100 }} />

              <View style={{ marginLeft: 12 }}>
                <View style={{ width: 120, height: 14, marginBottom: 8 }} />
                <View style={{ width: 90, height: 10 }} />
              </View>
            </View>

            <View style={[COMMON_STYLES.flexRowCenter]}>
              <View style={{ width: 60, height: 26, borderRadius: 50, marginRight: 8 }} />
              <View style={{ width: 40, height: 40, borderRadius: 50 }} />
            </View>
          </View>

          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
            >
              <View style={{ width: 20, height: 20, borderRadius: 100, marginRight: 20 }} />
              <View style={{ width: '70%', height: 10 }} />
            </View>
          ))}

          <View style={{ width: '100%', height: 48, marginTop: 4, borderRadius: 10 }} />
        </>
      </SkeletonPlaceholder>
    </Paper>
  )
}
