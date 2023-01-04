import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import Product from '../components/Product';
import Quantity from '../components/Quantity';

export default function Beverages() {
  const [beveragesList, setBeveragesList] = useState([]);
  const cartItemsNumber = useSelector(state => state.cart);
  const specificItems = beverage => {
    return cartItemsNumber.filter(item => item.id === beverage.id);
  };
  const getBeverages = () => {
    const beverageRef = database().ref(`beverages/`);
    beverageRef.on('value', snapshot => {
      const data = snapshot.val();
      console.log(Object.values(data));
      data ? setBeveragesList(Object.values(data).reverse()) : null;
      setBeveragesList(Object.values(data));
    });
  };
  useEffect(() => {
    getBeverages();
  }, []);
  return (
    <>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        {beveragesList && beveragesList.length > 0 ? (
          beveragesList.map((beverage, i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: '#fff',
                  marginVertical: 15,
                  flexDirection: 'column',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                  position: 'relative',
                }}>
                <Product
                  productName={beverage.name}
                  productDescription={beverage.desc}
                  productPrice={beverage.price.toFixed(0)}
                  productImage={beverage.images[1].lg}
                  resizeMode={'contain'}
                />
                {specificItems(beverage).length > 0 ? (
                  <>
                    <Quantity
                      product={beverage}
                      productId={beverage.id}
                      specificItemList={specificItems(beverage)}
                      key={i}
                    />
                  </>
                ) : (
                  <AddButton product={beverage} />
                )}
              </View>
            );
          })
        ) : (
          <View
            style={{
              height: 600,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#D00000'} size={100} />
          </View>
        )}
      </ScrollView>
    </>
  );
}
