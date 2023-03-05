import { ArrowRightIcon } from '@/assets'
import { Button, DateTimeField, RadioButtonField, TextField } from '@/components'
import { COMMON_STYLES } from '@/theme'
import {
  AddressRes,
  ForwardFormRef,
  UpdateUserInfo,
  UserDetailRes,
  UserInfoNavigation,
  UserInfoRes,
} from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { userInfoSchema } from './schema'

interface UserInfoFormProps {
  defaultValues?: UserDetailRes
  onSubmit?: (_: UpdateUserInfo) => void
}

export const UserInfoForm = forwardRef<ForwardFormRef, UserInfoFormProps>(
  ({ defaultValues, onSubmit }, ref) => {
    const navigation = useNavigation<UserInfoNavigation>()

    const { control, handleSubmit, reset, setFocus } = useForm<UserInfoRes>({
      resolver: yupResolver(userInfoSchema),
      mode: 'all',
      defaultValues: getDefaultValues(),
    })

    function getDefaultValues(): UserInfoRes | undefined {
      if (!defaultValues) return undefined

      const { detail_shipper } = defaultValues
      return {
        address: detail_shipper?.address?.full_adress || undefined,
        birth_day: detail_shipper?.birthday || undefined,
        email: detail_shipper?.email || undefined,
        name: detail_shipper?.name || undefined,
        phone: detail_shipper?.phone || undefined,
        sex: detail_shipper?.sex || undefined,
      }
    }

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    const onSubmitHandler = handleSubmit((data: UserInfoRes) => {
      onSubmit?.(data)
    })

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
          <TextField
            name="phone"
            control={control}
            label="Số điện thoại"
            placeholder="Số điện thoại"
            keyboardType="number-pad"
            onSubmitEditing={() => setFocus('email')}
            required
          />

          <TextField
            name="email"
            keyboardType="email-address"
            control={control}
            label="Email"
            placeholder="Email"
          />

          <TextField
            name="name"
            control={control}
            label="Tên cá nhân"
            placeholder="Tên cá nhân"
            required
          />

          <DateTimeField
            name="birth_day"
            control={control}
            label="Ngày sinh"
            placeholder="Ngày sinh"
          />

          <RadioButtonField
            data={[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
              { label: 'Khác', value: 'no_info' },
            ]}
            name="sex"
            control={control}
            label="Giới tính"
          />

          <TextField
            inputStyle={{ height: 64 }}
            editable={false}
            pointerEvents="none"
            numberOfLines={2}
            placeholder="Địa chỉ"
            label="Địa chỉ"
            name="address"
            multiline={true}
            rightIcon={<ArrowRightIcon />}
            value={defaultValues?.detail_shipper?.address?.full_adress}
            control={control}
            onPress={() =>
              navigation.navigate(
                'SelectAddress',
                defaultValues?.detail_shipper?.address as AddressRes
              )
            }
          />
        </ScrollView>

        <View style={COMMON_STYLES.buttonBottom}>
          <Button onPress={onSubmitHandler} title="Lưu" style={{ flex: 1 }} />
        </View>
      </View>
    )
  }
)
