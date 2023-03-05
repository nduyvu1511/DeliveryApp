import { NAVIGATION } from '@/constants'
import {
  CustomerMapDetailScreen,
  CustomerRouteDetailScreen,
  NotificationScreen,
  RouteDetailScreen,
  RouteListScreen,
  CustomerOrderDetailScreen,
  ScannerScreen,
  SearchScreen,
} from '@/screens'
import { COLORS } from '@/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: COLORS.white,
        statusBarStyle: 'dark',
        headerShown: false,
        animationDuration: 500,
      }}
      initialRouteName={NAVIGATION.home}
    >
      <Stack.Screen
        options={{ statusBarColor: COLORS.bgPrimary }}
        name={NAVIGATION.home}
        component={RouteListScreen}
      />
      <Stack.Screen name={NAVIGATION.notification} component={NotificationScreen} />
      <Stack.Screen name={NAVIGATION.customerOrderDetail} component={CustomerOrderDetailScreen} />
      <Stack.Screen name={NAVIGATION.routeDetail} component={RouteDetailScreen} />
      <Stack.Screen name={NAVIGATION.scanner} component={ScannerScreen} />
      <Stack.Screen name={NAVIGATION.customerRouteDetail} component={CustomerRouteDetailScreen} />
      <Stack.Screen name={NAVIGATION.search} component={SearchScreen} />
      <Stack.Screen
        name={NAVIGATION.customerMapDetail}
        component={CustomerMapDetailScreen}
        options={{
          statusBarColor: 'transparent',
          statusBarTranslucent: true,
          statusBarStyle: 'dark',
        }}
      />
    </Stack.Navigator>
  )
}
