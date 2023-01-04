import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

export default function Product({
  productName,
  productDescription,
  productPrice,
  productImage,
  resizeMode,
  onPress,
}) {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            margin: 5,
            marginLeft: 10,
            fontWeight: 'bold',
          }}>
          {productName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#9A9A9A',
            marginBottom: 4,
            marginLeft: 10,
          }}>
          {productDescription.length > 50
            ? productDescription.slice(0, 50) + '...'
            : productDescription}
        </Text>
        <Text
          style={{
            fontSize: 28,
            color: 'black',
            marginBottom: 4,
            marginLeft: 10,
            position: 'absolute',
            top: 170,
            left: 280,
            zIndex: 1,
            backgroundColor: '#FFD100',
            paddingHorizontal: 10,

            fontWeight: 'bold',
            paddingRight: 20,
          }}>
          ${productPrice}
        </Text>
        <Image
          style={{
            width: '100%',
            height: 160,
          }}
          source={{uri: `${productImage}`}}
          resizeMode={resizeMode}
        />
      </TouchableOpacity>
    </>
  );
}
