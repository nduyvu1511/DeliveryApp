import { NAVIGATION } from '@/constants'
import { LoginPasswordScreen, OTPScreen, PhoneScreen, ResetPasswordScreen } from '@/screens'
import { COLORS } from '@/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.phone}>
      <Stack.Screen
        component={PhoneScreen}
        name={NAVIGATION.phone}
        options={{ headerShown: false, statusBarTranslucent: true, statusBarColor: 'transparent' }}
      />

      <Stack.Screen
        name={NAVIGATION.loginPassword}
        options={{ headerShown: false, statusBarColor: COLORS.white, statusBarStyle: 'dark' }}
        component={LoginPasswordScreen}
      />

      <Stack.Screen
        name={NAVIGATION.resetPassword}
        options={{ headerShown: false, statusBarColor: COLORS.white, statusBarStyle: 'dark' }}
        component={ResetPasswordScreen}
      />

      <Stack.Screen
        name={NAVIGATION.OTP}
        options={{ headerShown: false, statusBarColor: COLORS.white, statusBarStyle: 'dark' }}
        component={OTPScreen}
      />
    </Stack.Navigator>
  )
}
