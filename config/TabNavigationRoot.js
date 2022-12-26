import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Landing from '../screens/Landing';
import Cart from '../screens/Cart';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'restaurant-menu' : 'restaurant';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'add-shopping-cart' : 'shopping-cart';
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
        // headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#D00000',
        tabBarLabelStyle: {
          fontSize: 12,
          height: 25,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen name="Menu" component={Landing} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}
