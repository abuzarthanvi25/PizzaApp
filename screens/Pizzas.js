import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import Product from '../components/Product';
import Quantity from '../components/Quantity';

export default function Pizzas({navigation}) {
  const [pizzaList, setPizzaList] = useState([]);
  const cartItemsNumber = useSelector(state => state.cart);
  let specificItems = pizza => {
    return cartItemsNumber.filter(item => item.id === pizza.id);
  };

  const getPizzas = () => {
    const pizzaRef = database().ref(`pizzas/`);
    pizzaRef.on('value', snapshot => {
      const data = snapshot.val();
      data ? setPizzaList(Object.values(data).reverse()) : null;
      setPizzaList(Object.values(data));
    });
  };
  useEffect(() => {
    getPizzas();
  }, []);
  return (
    <>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        {pizzaList && pizzaList.length > 0 ? (
          pizzaList.map((pizza, i) => {
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
                  productName={pizza.name}
                  productDescription={pizza.description}
                  productPrice={pizza.price}
                  productImage={pizza.img}
                  resizeMode={null}
                />
                {specificItems(pizza).length > 0 ? (
                  <>
                    <Quantity
                      product={pizza}
                      productId={pizza.id}
                      specificItemList={specificItems(pizza)}
                      key={i}
                    />
                  </>
                ) : (
                  <AddButton product={pizza} />
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
