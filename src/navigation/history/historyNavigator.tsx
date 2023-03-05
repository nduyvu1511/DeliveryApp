import { NAVIGATION } from '@/constants'
import {
  CustomerMapDetailScreen,
  CustomerOrderDetailHistoryScreen,
  CustomerRouteDetailHistoryScreen,
  OrderHistoryFilterScreen,
  RouteDetailHistoryScreen,
  RouteListHistoryScreen,
} from '@/screens'
import { COLORS } from '@/theme'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const HistoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: COLORS.white,
        statusBarStyle: 'dark',
        headerShown: false,
      }}
      initialRouteName={NAVIGATION.routeListHistory}
    >
      <Stack.Screen name={NAVIGATION.customerMapDetail} component={CustomerMapDetailScreen} />
      <Stack.Screen name={NAVIGATION.routeListHistory} component={RouteListHistoryScreen} />
      <Stack.Screen name={NAVIGATION.routeDetailHistory} component={RouteDetailHistoryScreen} />
      <Stack.Screen
        name={NAVIGATION.customerOrderDetailHistory}
        component={CustomerOrderDetailHistoryScreen}
      />
      <Stack.Screen
        name={NAVIGATION.customerRouteDetailHistory}
        component={CustomerRouteDetailHistoryScreen}
      />
      <Stack.Screen name={NAVIGATION.orderHistoryFilter} component={OrderHistoryFilterScreen} />
    </Stack.Navigator>
  )
}
