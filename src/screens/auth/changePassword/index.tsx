import { TabBar } from '@/components'
import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { COLORS, SPACING } from '@/theme'
import { ChangePasswordParams, LoginPasswordNavigation } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { ChangePasswordForm } from '../components'

export const ChangePasswordScreen = () => {
  const navigation = useNavigation<LoginPasswordNavigation>()
  const { asyncHandler } = useAsync()

  const handleChangePassword = (params: ChangePasswordParams) => {
    asyncHandler({
      fetcher: userAPI.changePassword(params),
      onSuccess: () => {
        navigation?.goBack()
      },
      config: {
        successMsg: 'Đổi mật khẩu thành công',
      },
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <TabBar title="Nhập mật khẩu" />

      <View style={{ flex: 1, padding: SPACING.container }}>
        <ChangePasswordForm onSubmit={handleChangePassword} />
      </View>
    </View>
  )
}
