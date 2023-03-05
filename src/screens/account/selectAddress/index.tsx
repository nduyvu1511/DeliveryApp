import { CheckIcon } from '@/assets'
import { TabBar } from '@/components'
import { useAsync } from '@/hooks'
import { userAPI } from '@/services'
import { useUserInfoSlice } from '@/store'
import { COLORS } from '@/theme'
import {
  CreateAddressForm,
  ForwardFormRef,
  SelectAddressNavigation,
  StackParamsList,
} from '@/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { AddressForm } from '../components'

export const SelectAddressScreen = () => {
  const ref = useRef<ForwardFormRef>(null)
  const navigation = useNavigation<SelectAddressNavigation>()
  const { params } = useRoute<RouteProp<StackParamsList, 'SelectAddress'>>()
  const { asyncHandler } = useAsync()
  const updateUserInfo = useUserInfoSlice((state) => state.updateUserInfo)

  const handleSubmit = (data: CreateAddressForm) => {
    asyncHandler({
      fetcher: userAPI.updateUserAddress({
        country_id: 241,
        district_id: data.district_id.id as number,
        state_id: data.state_id.id as number,
        street: data.street,
        ward_id: data.ward_id.id as number,
      }),
      onSuccess: () => {
        updateUserInfo({ address: data })
        navigation.navigate({
          name: 'UserInfo',
          params: undefined,
          merge: true,
        })
      },
      config: {
        successMsg: 'Cập nhật địa chỉ thành công',
      },
    })
  }

  return (
    <>
      <TabBar
        title="Chọn địa chỉ"
        headerRightIcon={<CheckIcon />}
        onHeaderRightClick={() => {
          ref.current?.onSubmit()
        }}
      />

      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AddressForm defaultValues={params} ref={ref} onSubmit={handleSubmit} />
      </View>
    </>
  )
}
