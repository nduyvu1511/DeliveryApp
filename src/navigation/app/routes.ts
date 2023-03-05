import { BoxesIcon, HomeIcon, LocationAndOrderIcon, OrderIcon, UserSquareIcon } from '@/assets'
import { TABS } from '@/constants'
import { AccountNavigator } from '../account'
import { HistoryNavigator } from '../history/historyNavigator'
import { HomeNavigator } from '../home/homeNavigator'
import { MapNavigator } from '../map/mapNavigator'
import { OrderNavigator } from '../order/orderNavigator'

export const bottomTabs = [
  { route: TABS.home, label: 'Trang chủ', Component: HomeNavigator, Icon: HomeIcon },
  { route: TABS.order, label: 'Đơn hàng', Component: OrderNavigator, Icon: BoxesIcon },
  { route: TABS.map, label: '', Component: MapNavigator, Icon: LocationAndOrderIcon },
  { route: TABS.history, label: 'Lịch sử', Component: HistoryNavigator, Icon: OrderIcon },
  { route: TABS.account, label: 'Cá nhân', Component: AccountNavigator, Icon: UserSquareIcon },
]
