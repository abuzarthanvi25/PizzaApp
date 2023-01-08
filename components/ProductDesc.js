import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import AddButton from './AddButton';

export default function ProductDesc({
  productName,
  productImage,
  resizeMode,
  productDescription,
  sizeAndCrust,
  productPrice,
}) {
  console.log(sizeAndCrust);
  return (
    <>
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <Text
          style={{
            color: 'red',
            fontSize: 28,
            margin: 10,
            marginLeft: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {productName}
        </Text>
        <View
          style={{
            marginHorizontal: 5,
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 330,
              height: 330,
              borderRadius: 50,
            }}
            source={{uri: `${productImage}`}}
            resizeMode={resizeMode}
          />
          <Text
            style={{
              fontSize: 20,
              color: '#949494',
              marginBottom: 15,
              marginLeft: 10,
              marginTop: 15,
              fontWeight: 'bold',
            }}>
            {productDescription}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 28,
            textAlign: 'right',
            color: 'black',
            marginBottom: 4,
            backgroundColor: '#FFD100',
            fontWeight: 'bold',
            padding: 10,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.44,
            shadowRadius: 10.32,

            elevation: 16,
            width: 200,
            marginTop: 10,
          }}>
          ${productPrice}
        </Text>
      </View>
    </>
  );
}
