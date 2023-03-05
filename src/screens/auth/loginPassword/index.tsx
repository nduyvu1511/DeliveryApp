import { TabBar } from '@/components'
import { TYPOGRAPHY } from '@/theme'
import { LoginPasswordForm, PhoneNavigation, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { LoginForm } from '../components'
import { useAuth } from '../hooks'
import { styles } from './style'

export const LoginPasswordScreen = () => {
  const { loginWithPassword } = useAuth()
  const { params } = useRoute<RouteProp<StackParamsList, 'LoginPassword'>>()
  const navigation = useNavigation<PhoneNavigation>()

  useEffect(() => {
    if (params === undefined) return
    if (!params?.phone) navigation.navigate({ name: 'Phone', params: undefined, merge: true })
  }, [params])

  const handleLoginWithPassword = (params: LoginPasswordForm) => {
    loginWithPassword({ params })
  }

  return (
    <>
      <TabBar title="Nhập mật khẩu" />
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, position: 'relative' }}>
          <View style={{ marginVertical: 24 }}>
            <Text style={{ ...TYPOGRAPHY.sm }}>
              Vui lòng nhập mật khẩu của số điện thoại{' '}
              <Text style={styles.phoneText}>{params.phone}</Text>
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <LoginForm
              onSubmit={handleLoginWithPassword}
              defaultValues={{ phone: params?.phone, password: '' }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.footerBtn}
            onPress={() =>
              params?.phone && navigation.navigate('ResetPassword', { phone: params?.phone })
            }
          >
            <Text style={styles.footerLabel}>Quên mật khẩu</Text>
          </Pressable>

          <Pressable
            style={styles.footerBtn}
            onPress={() =>
              params?.phone &&
              navigation.navigate('OTP', { phone: params?.phone, type: 'login_OTP' })
            }
          >
            <Text style={styles.footerLabel}>Đăng nhập bằng SMS</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  )
}
