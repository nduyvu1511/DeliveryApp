import { TabBar } from '@/components'
import { PhoneForm as PhoneFormParams, PhoneNavigation, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { PhoneForm } from '../components'
import { styles } from './style'

export const ResetPasswordScreen = () => {
  const { params } = useRoute<RouteProp<StackParamsList, 'LoginPassword'>>()
  const navigation = useNavigation<PhoneNavigation>()

  useEffect(() => {
    if (params === undefined) return
    if (!params?.phone) navigation.navigate({ name: 'Phone', params: undefined, merge: true })
  }, [params])

  const handleSubmit = ({ phone }: PhoneFormParams) => {
    navigation.navigate('OTP', { phone: params.phone, type: 'reset_password' })
  }

  return (
    <>
      <TabBar title="Quên mật khẩu" />

      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Vui lòng nhập tài khoản bạn muốn lấy lại mật khẩu</Text>
          </View>

          <PhoneForm onSubmit={handleSubmit} defaultValues={{ phone: params?.phone }} />
        </View>
      </View>
    </>
  )
}
