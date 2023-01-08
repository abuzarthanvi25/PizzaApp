import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import TabRoot from './TabRoot';
import Map from '../screens/Map';

const Stack = createNativeStackNavigator();

function NavigationRoot() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Landing Screen"
          component={TabRoot}
        />
        <Stack.Screen
          name="Login Screen"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Signup Screen"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="Checkout Screen"
          options={{headerShown: false}}
          component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationRoot;
