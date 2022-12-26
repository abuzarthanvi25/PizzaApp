import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.navigate('Login Screen');
  }, 1500);
  return (
    <>
      <View
        style={{
          backgroundColor: '#000000',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            height: 400,
            width: 400,
          }}
        />
        <ActivityIndicator size={55} color="#00BA82" />
      </View>
    </>
  );
}
