import { ArrowRightIcon } from '@/assets'
import { Alert, AmountBadge, AvatarPicker, Button, Paper } from '@/components'
// import { useForegroundLocation } from '@/hooks'
import { useUserInfoSlice } from '@/store'
import { COLORS } from '@/theme'
import { AccountNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { profileData } from './data'
import { styles } from './style'

export const ProfileScreen = () => {
  const navigation = useNavigation<AccountNavigation>()
  const userInfo = useUserInfoSlice((state) => state.userInfo)
  // const { isRunning, toggleService } = useForegroundLocation()

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgPrimary, flex: 1 }} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.header}>
          <View style={styles.bgImg}>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Cá nhân</Text>
              <AmountBadge value={userInfo?.detail_shipper?.total || 0} />
            </View>
          </View>

          {/* User Avatar Card */}
          <Paper style={styles.userBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AvatarPicker
                size={80}
                style={styles.avatar}
                source={userInfo?.detail_shipper?.image_url || ''}
              />

              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text numberOfLines={2} style={styles.userName}>
                  {userInfo?.detail_shipper?.name}
                </Text>
                <Text numberOfLines={2} style={styles.phone}>
                  {userInfo?.detail_shipper?.phone || ''}
                </Text>
                <Text numberOfLines={2} style={styles.email}>
                  {userInfo?.detail_shipper?.email || ''}
                </Text>
              </View>
            </View>
          </Paper>
        </View>

        <ScrollView style={styles.content}>
          <View style={{ marginBottom: 24 }}>
            {profileData.map((item, index) => (
              <View style={{ marginBottom: 24 }} key={index}>
                <Text style={styles.heading}>{item.title}</Text>

                {item.data.map((child, cIndex) => (
                  <Pressable
                    key={cIndex}
                    style={styles.listItem}
                    onPress={() => navigation.navigate(child.route as any, child.routeParams)}
                  >
                    <Text style={styles.listItemText}>{child.label}</Text>
                    <ArrowRightIcon fill={COLORS.gray50} />
                  </Pressable>
                ))}
              </View>
            ))}
            {/* <Pressable onPress={toggleService} style={[styles.listItem, { marginTop: -24 }]}>
              <Text style={styles.listItemText}>Theo dõi vị trí</Text>
              <Switch onChange={toggleService} value={isRunning} />
            </Pressable> */}
          </View>

          <RenderLogoutBtn />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const RenderLogoutBtn = () => {
  const logout = useUserInfoSlice((state) => state.logout)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const closeAlert = () => setShowAlert(false)

  return (
    <>
      <Button
        style={styles.btnLogout}
        textStyle={{ color: COLORS.primary }}
        onPress={() => setShowAlert(true)}
        title="Đăng xuất"
      />

      <Alert
        type="info"
        onDismiss={closeAlert}
        onRightBtnPress={logout}
        onLeftBtnPress={closeAlert}
        visible={showAlert}
        desc="Bạn có chắc chắn muốn đăng xuất tài khoản này khỏi thiết bị"
      />
    </>
  )
}
