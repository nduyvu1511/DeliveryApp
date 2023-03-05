import { NAVIGATION } from '@/constants'

export const profileData = [
  {
    title: 'Cá nhân',
    data: [
      { label: 'Thông tin cá nhân', route: NAVIGATION.userInfo, routeParams: undefined },
      { label: 'Đổi mật khẩu', route: NAVIGATION.changePassword, routeParams: undefined },
      { label: 'Thông báo', route: NAVIGATION.notification, routeParams: undefined },
    ],
  },
  {
    title: 'Khác',
    data: [
      { label: 'Lịch sử', route: NAVIGATION.accountRouteListHistory, routeParams: undefined },
      { label: 'Đơn hàng', route: NAVIGATION.accountOrder, routeParams: undefined },
      { label: 'Thiết lập máy in', route: NAVIGATION.printer, routeParams: undefined },
    ],
  },
]
