import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from '../screens/Landing';

const Stack = createNativeStackNavigator();

export default function LandingStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Landing"
          component={Landing}
        />
      </Stack.Navigator>
    </>
  );
}
