import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Landing from '../screens/Landing';
import Cart from '../screens/Cart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabRoot({navigation}) {
  const cartItemsNumber = useSelector(state => state.cart);

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
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#D00000',
        tabBarLabelStyle: {
          fontSize: 12,
          height: 25,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Menu"
        options={{headerShown: false}}
        component={Landing}
      />
      <Tab.Screen
        name="Cart"
        options={{tabBarBadge: cartItemsNumber.length}}
        component={Cart}
      />
    </Tab.Navigator>
  );
}
