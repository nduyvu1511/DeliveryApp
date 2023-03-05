import { Button, Countdown } from '@/components'
import { COLORS, COMMON_STYLES } from '@/theme'
import { ForwardFormRef, LoginPasswordNavigation, OTPFormParams } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import * as Yup from 'yup'
import { styles } from './style'

interface LoginFormProps {
  phoneNumber: string
  codeLength?: number
  timer?: number
  onVerifySuccess?: () => void
}

export const OTPForm = forwardRef<ForwardFormRef, LoginFormProps>(
  ({ phoneNumber, onVerifySuccess, codeLength = 6, timer = 120 }, ref) => {
    const navigation = useNavigation<LoginPasswordNavigation>()
    const [shouldResendCode, setShouldResendCode] = useState<boolean>(false)

    const {
      handleSubmit,
      reset,
      control,
      formState: { isValid, errors },
    } = useForm<OTPFormParams>({
      mode: 'onSubmit',
      resolver: yupResolver(
        Yup.object().shape({
          code: Yup.string()
            .length(codeLength, 'Vui lòng nhập mã OTP')
            .required('Vui lòng nhập mã OTP'),
        })
      ),
    })

    useImperativeHandle(ref, () => ({
      onSubmit: onSubmitHandler,
      onReset: reset,
    }))

    useEffect(() => {
      // if (!phoneNumber || confirm?.verificationId) return

      handleGenerateOTPCode(phoneNumber)
    }, [phoneNumber])

    const handleGenerateOTPCode = (phone: string) => {
      // generateOTPCode(phone, () => {
      //   setShouldResendCode(true)
      // })
    }

    const onSubmitHandler = handleSubmit(({ code }: OTPFormParams) => {
      // confirmOTPCode(code, () => {
      //   onVerifySuccess?.()
      // })
    })

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.otpWrapper}>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, ref }, fieldState: { error } }) => (
                <OTPInputView
                  ref={ref}
                  style={styles.otpInput}
                  pinCount={codeLength}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeChanged={onChange}
                  onCodeFilled={() => onSubmitHandler?.()}
                />
              )}
            />
          </View>

          {errors?.code?.message ? (
            <Text style={COMMON_STYLES.inputErrorText}>
              {errors?.code?.message || 'Đây là một trường bắt buộc'}
            </Text>
          ) : null}

          <Button
            disabled={!isValid}
            onPress={onSubmitHandler}
            title="Đăng nhập"
            style={{ borderRadius: 10, marginTop: 24 }}
          />
        </View>

        <View style={styles.footer}>
          {shouldResendCode ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.footerText}>Nhận mã sau </Text>

              <Countdown
                style={{ color: COLORS.primary }}
                defaultValue={timer}
                onLimit={() => setShouldResendCode(false)}
              />
            </View>
          ) : (
            <Pressable
              style={{ paddingVertical: 4 }}
              onPress={() => phoneNumber && handleGenerateOTPCode(phoneNumber)}
            >
              <Text style={styles.footerText}>Gửi lại mã?</Text>
            </Pressable>
          )}

          <Pressable
            style={{ paddingVertical: 4 }}
            onPress={() => navigation.navigate('LoginPassword', { phone: phoneNumber })}
          >
            <Text style={styles.footerText}>Đăng nhập mật khẩu</Text>
          </Pressable>
        </View>
      </View>
    )
  }
)
