import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import Product from '../components/Product';
import Quantity from '../components/Quantity';

export default function ShoppingCart() {
  const [desertsList, setDesertsList] = useState([]);
  const cartItemsNumber = useSelector(state => state.cart);
  const specificItems = desert => {
    return cartItemsNumber.filter(item => item.id === desert.id);
  };
  const getDeserts = () => {
    const desertRef = database().ref(`deserts/`);
    desertRef.on('value', snapshot => {
      const data = snapshot.val();
      console.log(Object.values(data));
      data ? setDesertsList(Object.values(data).reverse()) : null;
      setDesertsList(Object.values(data));
    });
  };
  useEffect(() => {
    getDeserts();
  }, []);
  return (
    <>
      <ScrollView
        style={{
          margin: 20,
        }}>
        {desertsList && desertsList.length > 0 ? (
          desertsList.map((desert, i) => {
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
                  productName={desert.name}
                  productDescription={desert.description}
                  productPrice={desert.price}
                  productImage={desert.img}
                  resizeMode={'contain'}
                />
                {specificItems(desert).length > 0 ? (
                  <>
                    <Quantity
                      product={desert}
                      productId={desert.id}
                      specificItemList={specificItems(desert)}
                      key={i}
                    />
                  </>
                ) : (
                  <AddButton product={desert} />
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
