import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {remove, removeAll} from '../store/cartSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Cart({navigation}) {
  let cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const totalPrice = cartItems
    .map(x => x.price)
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(0);
  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((x, i) => (
              <View key={i}>
                <View
                  key={x.id}
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    backgroundColor: 'white',
                    marginVertical: 10,
                    marginHorizontal: 12,
                    borderRadius: 20,
                    padding: 5,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      resizeMode="contain"
                      style={{
                        height: 70,
                        width: 90,
                        margin: 10,
                        borderRadius: 20,
                      }}
                      source={{
                        uri:
                          (x.img || x.image) ??
                          (x.img || x.images[1].lg || x.img[1].lg),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      marginLeft: 5,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#222',
                        textAlign: 'left',
                        fontWeight: 'bold',
                      }}>
                      {x.name.slice(0, 50) + (x.name.length > 50 ? '...' : '')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#9A9A9A',
                        textAlign: 'left',
                      }}>
                      {x.desc
                        ? x.desc.slice(0, 50) +
                          (x.desc.length > 50 ? '...' : '')
                        : x.description.slice(0, 50) +
                          (x.description.length > 50 ? '...' : '')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 25,
                        color: '#D00000',
                        textAlign: 'left',
                        fontWeight: '900',
                      }}>
                      ${x.price.toFixed(0)}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(remove(x.id));
                      }}
                      activeOpacity={0.6}
                      style={{
                        paddingRight: 10,
                        borderRadius: 20,
                      }}>
                      <Icon name="delete" size={25} color="#D00000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 700,
              }}>
              <Text style={{fontSize: 20, color: 'grey'}}>NOT HUNGRY?</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {totalPrice && totalPrice > 0 ? (
        <>
          <View
            style={{
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#E0E0E0',
                padding: 7,
                borderRadius: 10,
              }}
              onPress={() => dispatch(removeAll())}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{color: '#D00000', fontSize: 16, fontWeight: 'bold'}}>
                  Remove All
                </Text>
                <Icon
                  name="backspace"
                  size={20}
                  color="#D00000"
                  style={{marginLeft: 2}}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: '#A9A9A9',
                fontSize: 15,
              }}>
              {cartItems.length} Food Item{cartItems.length > 1 ? 's' : ''} |
            </Text>
            <Text
              style={{
                color: '#4D4D4D',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Sub Total: ${totalPrice}
            </Text>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                width: 50,
                margin: 10,
                marginHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 10,
                width: 'auto',
              }}>
              <Icon name="logout" size={18} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  marginLeft: 5,
                  fontWeight: 'bold',
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </>
  );
}
