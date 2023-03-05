import { QrCodeIcon } from '@/assets'
import { TabBar } from '@/components'
import { NAVIGATION } from '@/constants'
import {
  SearchDeliveryReceivedScreen,
  SearchOrderNoReceivedScreen,
  SearchOrderReceivedScreen,
} from '@/screens'
import { COLORS, TYPOGRAPHY } from '@/theme'
import { HomeNavigation, StackParamsList } from '@/types'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

const Tab = createMaterialTopTabNavigator()

export const OrderViewNavigator = () => {
  const navigation = useNavigation<HomeNavigation>()
  const route = useRoute<RouteProp<StackParamsList, 'Order'>>()
  const screen = getFocusedRouteNameFromRoute(route)

  const handleNavigate = () => {
    if (!screen || screen === NAVIGATION.orderNoReceived) {
      navigation.navigate('ScanOrderNoReceived')
    } else if (screen === NAVIGATION.orderReceived) {
      navigation.navigate('ScanOrderReceived')
    } else if (screen === NAVIGATION.searchDeliveryReceived) {
      navigation.navigate('ScanDeliveryReceived')
    }
  }

  return (
    <>
      <TabBar
        title="Đơn hàng"
        headerRightIcon={<QrCodeIcon size={16} />}
        onHeaderRightClick={handleNavigate}
      />

      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarPressColor: COLORS.gray30,
            tabBarIndicatorStyle: { height: 1.4, backgroundColor: COLORS.primary },
            tabBarLabelStyle: {
              ...TYPOGRAPHY.smSemiBold,
              textTransform: 'capitalize',
              color: route.name === screen ? COLORS.primary : COLORS.textBody,
            },
          }
        }}
        initialRouteName={NAVIGATION.orderNoReceived}
      >
        <Tab.Screen
          options={{ tabBarLabel: 'Chưa nhận' }}
          name={NAVIGATION.orderNoReceived}
          component={SearchOrderNoReceivedScreen}
        />
        <Tab.Screen
          options={{ tabBarLabel: 'Đã nhận' }}
          name={NAVIGATION.orderReceived}
          component={SearchOrderReceivedScreen}
        />
        <Tab.Screen
          options={{ tabBarLabel: 'Đang giao' }}
          name={NAVIGATION.searchDeliveryReceived}
          component={SearchDeliveryReceivedScreen}
        />
      </Tab.Navigator>
    </>
  )
}
