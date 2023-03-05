import { useUserInfoSlice } from '@/store'
import { COLORS } from '@/theme'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppNavigator } from '../app'
import { AuthNavigator } from '../auth'

export const RootNavigator = () => {
  const token = useUserInfoSlice((state) => state.token)

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: COLORS.bg,
          },
        }}
      >
        {token ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
