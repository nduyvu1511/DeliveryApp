import { NotificationIcon } from '@/assets'
import { AmountBadge, Avatar, SearchInput } from '@/components'
import { useUserInfoSlice } from '@/store'
import { COLORS } from '@/theme'
import { HomeNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style'

export const HomeHeader = () => {
  const navigation = useNavigation<HomeNavigation>()
  const userInfo = useUserInfoSlice((state) => state.userInfo)

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.bgPrimary,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
      edges={['top']}
    >
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <View style={styles.headerUserInfo}>
              <View style={styles.headerAvatar}>
                <Avatar size={36} url={userInfo?.image || ''} />
              </View>

              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.headerTitle}>
                  {userInfo?.name}
                </Text>
                <Text style={styles.headerDesc}>Mừng bạn trở lại</Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <View style={{ marginRight: 16 }}>
                <Pressable
                  onPress={() => navigation.navigate('Notification')}
                  style={{ position: 'relative' }}
                >
                  <NotificationIcon fill={COLORS.gray50} />
                  {userInfo?.detail_shipper?.notification_counts ? (
                    <View style={styles.headerNotificationDot} />
                  ) : null}
                </Pressable>
              </View>

              <AmountBadge value={userInfo?.detail_shipper?.total || 0} />
            </View>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <SearchInput
            editable={false}
            pointerEvents="none"
            onPress={() => navigation.navigate('Search')}
            onChangeText={(val) => console.log({ val })}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
