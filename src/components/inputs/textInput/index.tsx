import { COLORS, COMMON_STYLES, TYPOGRAPHY } from '@/theme'
import React, { forwardRef } from 'react'
import {
  Pressable,
  Text,
  TextInput as RTextInput,
  TextInputProps as RTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

export type TextInputProps = Omit<RTextInputProps, 'theme' | 'label'> & {
  label?: string
  style?: ViewStyle | ViewStyle[]
  inputStyle?: ViewStyle | ViewStyle | TextStyle | TextStyle[]
  inputWrapperStyle?: ViewStyle | ViewStyle[]
  required?: boolean
  error?: string
  rightIcon?: JSX.Element
  leftIcon?: JSX.Element
  onPress?: Function
}

export const TextInput = forwardRef<RTextInput, TextInputProps>(
  (
    {
      required,
      onPress,
      style: externalStyle,
      inputWrapperStyle,
      inputStyle,
      label,
      rightIcon,
      leftIcon,
      error,
      ...attributes
    },
    refProps
  ) => {
    const handlePress = () => onPress?.()

    return (
      <View style={externalStyle}>
        {label ? (
          <Pressable onPress={handlePress}>
            <Text style={[TYPOGRAPHY.baseBold, { marginBottom: 8 }]}>
              {label}
              {required ? <Text style={[TYPOGRAPHY.smBold, { color: COLORS.red }]}> *</Text> : null}
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          style={[
            COMMON_STYLES.inputWrapper,
            !!error && { borderColor: COLORS.red, borderWidth: 0.6 },
            inputWrapperStyle,
          ]}
          onPress={handlePress}
        >
          {leftIcon ? (
            <View style={COMMON_STYLES.inputLeftIcon}>
              <Text>{leftIcon}</Text>
            </View>
          ) : null}

          <RTextInput
            ref={refProps as any}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            style={[
              COMMON_STYLES.input,
              COMMON_STYLES.inputText,
              rightIcon && { paddingRight: 40 },
              inputStyle,
            ]}
            placeholderTextColor={COLORS.placeHolder}
            {...attributes}
          />

          {rightIcon ? <View style={COMMON_STYLES.inputRightIcon}>{rightIcon}</View> : null}
        </Pressable>

        {error ? (
          <Text style={COMMON_STYLES.inputErrorText}>{error || 'Đây là một trường bắt buộc'}</Text>
        ) : null}
      </View>
    )
  }
)
