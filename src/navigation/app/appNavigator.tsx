import { NavBottomItem } from '@/components'
import { SCREEN_HIDE_TAB_BAR, TABS } from '@/constants'
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute, ParamListBase, RouteProp } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { bottomTabs } from './routes'

const Tab = createBottomTabNavigator()

export const AppNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      <Tab.Navigator
        defaultScreenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: TYPOGRAPHY.topBarTitle,
        }}
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          unmountOnBlur: true,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            display: getRouteName(route),
            borderTopWidth: 0,
            height: SPACING.bottomNavHeight,
          },
        })}
      >
        {bottomTabs.map(({ Component, Icon, label, route }) => (
          <Tab.Screen
            key={route}
            name={route}
            options={({ navigation, route }) => ({
              tabBarButton: ({ accessibilityState }) => (
                <NavBottomItem
                  onPress={() => navigation.navigate(route)}
                  label={label}
                  active={accessibilityState?.selected}
                  RenderIcon={Icon}
                />
              ),
            })}
            component={Component}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const getRouteName = (route: RouteProp<ParamListBase, string>) => {
  const routeName = getFocusedRouteNameFromRoute(route) || ''
  if (SCREEN_HIDE_TAB_BAR?.includes(routeName) || SCREEN_HIDE_TAB_BAR.includes(route?.name || ''))
    return 'none'

  return 'flex'
}
