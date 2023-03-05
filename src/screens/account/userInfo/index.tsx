import { CheckIcon } from '@/assets'
import { TabBar } from '@/components'
import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { useUserInfoSlice } from '@/store'
import { COLORS } from '@/theme'
import { AccountNavigation, ForwardFormRef, UserInfoRes } from '@/types'
import { useNavigation } from '@react-navigation/native'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { UserInfoForm } from '../components'

export const UserInfoScreen = () => {
  const { asyncHandler } = useAsync()
  const ref = useRef<ForwardFormRef>(null)
  const navigation = useNavigation<AccountNavigation>()
  const userInfo = useUserInfoSlice((state) => state.userInfo)
  const setUserInfo = useUserInfoSlice((state) => state.setUserInfo)

  const handleSubmit = ({ address, ...data }: UserInfoRes) => {
    asyncHandler({
      fetcher: userAPI.updateUserInfo(data),
      onSuccess: (res) => {
        setUserInfo(res)
        navigation.navigate({ name: 'Account', merge: true, params: undefined })
      },
      config: {
        successMsg: 'Cập nhật thông tin người dùng thành công',
      },
    })
  }

  return (
    <>
      <TabBar
        title="Chỉnh sửa thông tin"
        headerRightIcon={<CheckIcon />}
        onHeaderRightClick={() => ref.current?.onSubmit()}
      />

      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <UserInfoForm ref={ref} defaultValues={userInfo} onSubmit={handleSubmit} />
      </View>
      </>
  )
}
