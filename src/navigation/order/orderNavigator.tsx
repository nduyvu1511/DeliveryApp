import { NAVIGATION } from '@/constants'
import {
  CustomerOrderDetailScreen,
  CustomerRouteDetailScreen,
  OrderSearchDetailScreen,
  ScanDeliveryReceivedScreen,
  ScanOrderNoReceivedScreen,
  ScanOrderReceivedScreen,
} from '@/screens'
import { COLORS } from '@/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { OrderViewNavigator } from '../orderView'

const Stack = createNativeStackNavigator()

export const OrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, statusBarColor: COLORS.white, statusBarStyle: 'dark' }}
      initialRouteName={NAVIGATION.order}
    >
      <Stack.Screen name={NAVIGATION.order} component={OrderViewNavigator} />
      <Stack.Screen name={NAVIGATION.orderSearchDetail} component={OrderSearchDetailScreen} />
      <Stack.Screen name={NAVIGATION.customerOrderDetail} component={CustomerOrderDetailScreen} />
      <Stack.Screen name={NAVIGATION.customerRouteDetail} component={CustomerRouteDetailScreen} />
      <Stack.Screen name={NAVIGATION.scanOrderReceived} component={ScanOrderReceivedScreen} />
      <Stack.Screen name={NAVIGATION.scanOrderNoReceived} component={ScanOrderNoReceivedScreen} />
      <Stack.Screen name={NAVIGATION.scanDeliveryReceived} component={ScanDeliveryReceivedScreen} />
    </Stack.Navigator>
  )
}
