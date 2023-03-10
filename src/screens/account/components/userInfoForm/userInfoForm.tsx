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
            label="S??? ??i???n tho???i"
            placeholder="S??? ??i???n tho???i"
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
            label="T??n c?? nh??n"
            placeholder="T??n c?? nh??n"
            required
          />

          <DateTimeField
            name="birth_day"
            control={control}
            label="Ng??y sinh"
            placeholder="Ng??y sinh"
          />

          <RadioButtonField
            data={[
              { label: 'Nam', value: 'male' },
              { label: 'N???', value: 'female' },
              { label: 'Kh??c', value: 'no_info' },
            ]}
            name="sex"
            control={control}
            label="Gi???i t??nh"
          />

          <TextField
            inputStyle={{ height: 64 }}
            editable={false}
            pointerEvents="none"
            numberOfLines={2}
            placeholder="?????a ch???"
            label="?????a ch???"
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
          <Button onPress={onSubmitHandler} title="L??u" style={{ flex: 1 }} />
        </View>
      </View>
    )
  }
)
