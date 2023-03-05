import { NAVIGATION } from '@/constants'
import {
  ChangePasswordScreen,
  CustomerOrderDetailHistoryScreen,
  CustomerRouteDetailHistoryScreen,
  NotificationScreen,
  OrderHistoryFilterScreen,
  ProfileScreen,
  RouteDetailHistoryScreen,
  RouteListHistoryScreen,
  SelectAddressScreen,
  SelectPrinterScreen,
  UserInfoScreen,
} from '@/screens'
import { COLORS } from '@/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { HistoryNavigator } from '../history'
import { OrderNavigator } from '../order'

const Stack = createNativeStackNavigator()

export const AccountNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarColor: COLORS.white, statusBarStyle: 'dark' }}
    >
      <Stack.Screen
        name={NAVIGATION.account}
        options={{ statusBarColor: COLORS.bgPrimary }}
        component={ProfileScreen}
      />
      <Stack.Screen name={NAVIGATION.userInfo} component={UserInfoScreen} />
      <Stack.Screen name={NAVIGATION.history} component={HistoryNavigator} />
      <Stack.Screen name={NAVIGATION.selectAddress} component={SelectAddressScreen} />
      <Stack.Screen name={NAVIGATION.changePassword} component={ChangePasswordScreen} />
      <Stack.Screen name={NAVIGATION.notification} component={NotificationScreen} />
      <Stack.Screen name={NAVIGATION.accountRouteListHistory} component={RouteListHistoryScreen} />
      <Stack.Screen name={NAVIGATION.routeDetailHistory} component={RouteDetailHistoryScreen} />
      <Stack.Screen name={NAVIGATION.accountOrder} component={OrderNavigator} />
      <Stack.Screen
        name={NAVIGATION.customerOrderDetailHistory}
        component={CustomerOrderDetailHistoryScreen}
      />
      <Stack.Screen
        name={NAVIGATION.customerRouteDetailHistory}
        component={CustomerRouteDetailHistoryScreen}
      />
      <Stack.Screen name={NAVIGATION.orderHistoryFilter} component={OrderHistoryFilterScreen} />
      <Stack.Screen name={NAVIGATION.printer} component={SelectPrinterScreen} />
    </Stack.Navigator>
  )
}
