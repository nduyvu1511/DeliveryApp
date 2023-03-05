import { Button, PasswordField } from '@/components'
import { ChangePasswordParams, ForwardFormRef } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { changePasswordSchema } from './schema'

interface PhoneFormProps {
  defaultValues?: ChangePasswordParams
  onSubmit?: (_: ChangePasswordParams) => void
}

export const ChangePasswordForm = forwardRef<ForwardFormRef, PhoneFormProps>(
  ({ defaultValues, onSubmit }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      setFocus,
      formState: { isValid },
    } = useForm<ChangePasswordParams>({
      resolver: yupResolver(changePasswordSchema),
      mode: 'all',
      defaultValues,
    })

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    const onSubmitHandler = handleSubmit((data: ChangePasswordParams) => {
      onSubmit?.(data)
    })

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <PasswordField
            required
            name="old_password"
            control={control}
            placeholder="Mật khẩu hiện tại"
            label="Mật khẩu hiện tại"
            returnKeyType="next"
            onSubmitEditing={() => setFocus('password')}
          />

          <PasswordField
            required
            name="password"
            control={control}
            placeholder="Mật khẩu mới"
            label="Mật khẩu mới"
            returnKeyType="next"
            onSubmitEditing={() => setFocus('re_password')}
          />

          <PasswordField
            required
            name="re_password"
            control={control}
            placeholder="Xác nhận mật khẩu mới"
            label="Xác nhận mật khẩu mới"
            returnKeyType="send"
            onSubmitEditing={onSubmitHandler}
          />
        </ScrollView>

        <Button
          disabled={!isValid}
          onPress={onSubmitHandler}
          title={'Xác nhận'}
          style={{ borderRadius: 10, marginTop: 24 }}
        />
      </View>
    )
  }
)
