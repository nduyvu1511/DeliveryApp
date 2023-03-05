import { NAVIGATION } from '@/constants'
import { RouteMapScreen } from '@/screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export const MapNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={NAVIGATION.map}>
      <Stack.Screen
        name={NAVIGATION.map}
        component={RouteMapScreen}
        options={{
          statusBarColor: 'transparent',
          statusBarTranslucent: true,
          statusBarStyle: 'dark',
        }}
      />
    </Stack.Navigator>
  )
}
