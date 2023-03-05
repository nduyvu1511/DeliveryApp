import { imageBlur, loginLogo } from '@/assets'
import { COLORS } from '@/theme'
import { LoginPasswordForm } from '@/types'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginForm } from '../components'
import { useAuth } from '../hooks'
import { styles } from './style'

export const PhoneScreen = () => {
  const { loginWithPassword } = useAuth()

  const handleSubmit = (params: LoginPasswordForm) => {
    loginWithPassword({ params })
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            resizeMode="contain"
            loadingIndicatorSource={{ uri: imageBlur }}
            style={styles.image}
            source={loginLogo}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Chào bạn, vui lòng đăng nhập để tiếp tục</Text>
          </View>

          <LoginForm onSubmit={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
