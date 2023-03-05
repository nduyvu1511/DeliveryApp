import { Button, PasswordField, TextField } from '@/components'
import { ForwardFormRef, LoginPasswordForm } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { loginPasswordSchema } from './schema'

interface LoginFormProps {
  defaultValues?: LoginPasswordForm
  onSubmit?: (_: LoginPasswordForm) => void
}

export const LoginForm = forwardRef<ForwardFormRef, LoginFormProps>(
  ({ defaultValues, onSubmit }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      setFocus,
      formState: { isValid },
    } = useForm<LoginPasswordForm>({
      resolver: yupResolver(loginPasswordSchema),
      mode: 'all',
      defaultValues,
    })

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    const onSubmitHandler = handleSubmit((data: LoginPasswordForm) => {
      onSubmit?.(data)
    })

    return (
      <View style={{ flex: 1 }}>
        <TextField
          autoFocus
          name="phone"
          keyboardType="number-pad"
          placeholder="Số điện thoại"
          control={control}
          onSubmitEditing={() => setFocus('password')}
        />

        <PasswordField
          placeholder="Mật khẩu"
          returnKeyType="send"
          name="password"
          control={control}
          onSubmitEditing={onSubmitHandler}
        />

        <Button
          style={{ marginTop: 24 }}
          disabled={!isValid}
          onPress={onSubmitHandler}
          title="Đăng nhập"
        />
      </View>
    )
  }
)
