import { TabBar } from '@/components'
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme'
import { PhoneNavigation, StackParamsList } from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { OTPForm } from '../components'
import { styles } from './style'

export const OTPScreen = () => {
  const { params } = useRoute<RouteProp<StackParamsList, 'OTP'>>()
  const navigation = useNavigation<PhoneNavigation>()

  useEffect(() => {
    if (params === undefined) return
    if (!params?.phone) navigation.navigate({ name: 'Phone', params: undefined, merge: true })
  }, [params])

  const handleNavigate = () => {
    if (params.type == 'login_OTP') {
      // navigation.navigate('Phone')
    } else if (params.type === 'reset_password') {
    }
  }

  return (
    <>
      <TabBar title="Nhập mã OTP" />

      <View style={styles.container}>
        <View style={{ paddingHorizontal: SPACING.container, marginTop: 24 }}>
          <Text style={{ ...TYPOGRAPHY.smNormal }}>
            Để xác minh số điện thoại là bạn, nhập mã gồm 6 chữ số vừa được gủi đến
            <Text style={{ ...TYPOGRAPHY.smBold, color: COLORS.primary }}> {params.phone}</Text>
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <OTPForm phoneNumber={params?.phone} onVerifySuccess={handleNavigate} />
        </View>
      </View>
    </>
  )
}
