import { Button, TextField } from '@/components'
import { ForwardFormRef, PhoneForm as PhoneFormParams } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { phoneSchema } from './schema'

interface PhoneFormProps {
  defaultValues?: PhoneFormParams
  onSubmit?: (_: PhoneFormParams) => void
  btnLabel?: string
}

export const PhoneForm = forwardRef<ForwardFormRef, PhoneFormProps>(
  ({ defaultValues, onSubmit, btnLabel }, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { isValid },
    } = useForm<PhoneFormParams>({
      resolver: yupResolver(phoneSchema),
      mode: 'onSubmit',
      defaultValues,
    })

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    const onSubmitHandler = handleSubmit((data: PhoneFormParams) => {
      onSubmit?.(data)
    })

    return (
      <>
        <TextField
          keyboardType="number-pad"
          name="phone"
          control={control}
          placeholder="Số điện thoại"
          onSubmitEditing={onSubmitHandler}
        />

        <Button disabled={!isValid} onPress={onSubmitHandler} title={btnLabel || 'Tiếp tục'} />
      </>
    )
  }
)
