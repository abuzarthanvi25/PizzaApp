import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {burgers} from '../data/data';
import {add} from '../store/cartSlice';

export default function Burgers() {
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
        }}>
        {burgers && burgers.length > 0
          ? burgers.map((burger, i) => (
              <TouchableOpacity key={i}>
                <View
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
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      margin: 5,
                      marginLeft: 10,
                      fontWeight: 'bold',
                    }}>
                    {burger.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#9A9A9A',
                      marginBottom: 4,
                      marginLeft: 10,
                    }}>
                    {burger.desc.length > 50
                      ? burger.desc.slice(0, 50) + '...'
                      : burger.desc}
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
                    ${burger.price.toFixed(0)}
                  </Text>
                  <Image
                    style={{
                      width: '100%',
                      height: 160,
                    }}
                    source={{uri: `${burger.images[1].lg}`}}
                    resizeMode={'contain'}
                  />
                  <View style={{alignItems: 'space-between'}}>
                    <TouchableOpacity
                      onPress={() => dispatch(add(burger))}
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
                        paddingVertical: 6,
                        width: 'auto',
                      }}>
                      <Icon name="add" size={13} color="white" />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          marginLeft: 5,
                          fontWeight: 'bold',
                        }}>
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>
    </>
  );
}
