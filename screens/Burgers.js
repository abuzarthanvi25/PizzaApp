import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import Product from '../components/Product';
import Quantity from '../components/Quantity';

export default function Burgers() {
  const [burgerList, setburgerList] = useState([]);
  const cartItemsNumber = useSelector(state => state.cart);
  const specificItems = burger => {
    return cartItemsNumber.filter(item => item.id === burger.id);
  };
  const getBurgers = () => {
    const burgerRef = database().ref(`burgers/`);
    burgerRef.on('value', snapshot => {
      const data = snapshot.val();
      console.log(Object.values(data));
      data ? setburgerList(Object.values(data).reverse()) : null;
      setburgerList(Object.values(data));
    });
  };
  useEffect(() => {
    getBurgers();
  }, []);
  return (
    <>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        {burgerList && burgerList.length > 0 ? (
          burgerList.map((burger, i) => {
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
                  productName={burger.name}
                  productDescription={burger.desc}
                  productPrice={burger.price.toFixed(0)}
                  productImage={burger.images[1].lg}
                  resizeMode={'contain'}
                />
                {specificItems(burger).length > 0 ? (
                  <>
                    <Quantity
                      product={burger}
                      productId={burger.id}
                      specificItemList={specificItems(burger)}
                      key={i}
                    />
                  </>
                ) : (
                  <AddButton product={burger} />
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
