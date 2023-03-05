import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  CustomerRouteRes,
  GetCustomerOrderDetail,
  GetCustomerRouteDetail,
  GetRouteDetail,
} from './delivery'
import { AddressRes } from './user'

export type RouteDetailParams = GetRouteDetail & { route_name: string }
export type CustomerRouteDetailParams = RouteDetailParams &
  GetCustomerRouteDetail & { customer_name: string }
export type CustomerOrderDetailParams = CustomerRouteDetailParams &
  GetCustomerOrderDetail & { order_code: string }

export type StackParamsList = {
  Home: undefined
  Route: undefined
  Map: undefined
  History: undefined
  Account: undefined
  Scanner: undefined
  RouteDetail: RouteDetailParams
  CustomerRouteDetail: CustomerRouteDetailParams
  CustomerOrderDetail: CustomerOrderDetailParams & { screen?: StackParamsListKey }
  RouteListHistory: undefined
  RouteDetailHistory: RouteDetailParams
  CustomerRouteDetailHistory: CustomerRouteDetailParams
  CustomerOrderDetailHistory: CustomerOrderDetailParams
  Search: undefined
  Order: undefined
  Phone: undefined
  OTP: { phone: string; type: 'login_OTP' | 'reset_password' }
  ResetPassword: { phone: string }
  LoginPassword: { phone: string }
  ChangePassword: undefined
  CustomerMapDetail: CustomerRouteRes & RouteDetailParams
  OrderHistoryFilter: undefined
  UserInfo: undefined
  SelectAddress: AddressRes
  Notification: undefined
  ScanOrderNoReceived: undefined
  ScanOrderReceived: undefined
  OrderSearchDetail: {
    order_code: string
    delivery_route_id: number
  }
  OrderReceived: undefined
  OrderNoReceived: undefined
  SearchOrderNoReceived: undefined
  SearchOrderReceived: undefined
  SearchDeliveryReceived: undefined
  ScanDeliveryReceived: undefined
  Printer: undefined
}

export type StackParamsListKey = keyof StackParamsList
export type PhoneNavigation = NativeStackNavigationProp<StackParamsList, 'Phone'>
export type NotificationNavigation = NativeStackNavigationProp<StackParamsList, 'Notification'>
export type SelectAddressNavigation = NativeStackNavigationProp<StackParamsList, 'SelectAddress'>
export type HomeNavigation = NativeStackNavigationProp<StackParamsList, 'Home'>
export type OTPNavigation = NativeStackNavigationProp<StackParamsList, 'OTP'>
export type ChangePasswordNavigation = NativeStackNavigationProp<StackParamsList, 'ChangePassword'>
export type ResetPasswordNavigation = NativeStackNavigationProp<StackParamsList, 'ResetPassword'>
export type LoginPasswordNavigation = NativeStackNavigationProp<StackParamsList, 'LoginPassword'>
export type AccountNavigation = NativeStackNavigationProp<StackParamsList, 'Account'>
export type HistoryNavigation = NativeStackNavigationProp<StackParamsList, 'History'>
export type UserInfoNavigation = NativeStackNavigationProp<StackParamsList, 'UserInfo'>
export type MapNavigation = NativeStackNavigationProp<StackParamsList, 'Map'>
export type RouteNavigation = NativeStackNavigationProp<StackParamsList, 'Route'>
export type RouteDetailNavigation = NativeStackNavigationProp<StackParamsList, 'RouteDetail'>
export type SearchNavigation = NativeStackNavigationProp<StackParamsList, 'Search'>
export type OrderNavigation = NativeStackNavigationProp<StackParamsList, 'Order'>
export type OrderHistoryFilterNavigation = NativeStackNavigationProp<
  StackParamsList,
  'OrderHistoryFilter'
>
export type CustomerOrderDetailNavigation = NativeStackNavigationProp<
  StackParamsList,
  'CustomerOrderDetail'
>
export type CustomerMapDetailNavigation = NativeStackNavigationProp<
  StackParamsList,
  'CustomerMapDetail'
>
export type CustomerRouteDetailNavigation = NativeStackNavigationProp<
  StackParamsList,
  'CustomerRouteDetail'
>
export type RouteListHistoryNavigation = NativeStackNavigationProp<
  StackParamsList,
  'RouteListHistory'
>
export type CustomerOrderDetailHistoryNavigation = NativeStackNavigationProp<
  StackParamsList,
  'CustomerOrderDetailHistory'
>
export type RouteDetailHistoryNavigation = NativeStackNavigationProp<
  StackParamsList,
  'RouteDetailHistory'
>
export type CustomerRouteDetailHistoryNavigation = NativeStackNavigationProp<
  StackParamsList,
  'CustomerRouteDetailHistory'
>
