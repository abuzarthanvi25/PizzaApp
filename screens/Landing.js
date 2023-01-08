import * as React from 'react';
import {
  useWindowDimensions,
  Text,
  Image,
  ScrollView,
  View,
  Button,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import Pizzas from './Pizzas';
import Deserts from './Deserts';
import Burgers from './Burgers';
import Beverages from './Beverages';
import database from '@react-native-firebase/database';

const renderTabBar = props => (
  <TabBar
    {...props}
    renderIcon={props => getTabBarIcon(props)}
    indicatorStyle={{
      backgroundColor: '#D00000',
      height: '100%',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      alignItems: 'center',
      justifyContent: 'center',
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    }}
    style={{
      backgroundColor: '#fff',
      borderRadius: 20,
      marginTop: 5,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    }}
    renderLabel={({route, focused}) => (
      <Text
        style={{
          color: focused ? 'white' : '#D00000',
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const getTabBarIcon = props => {
  const {route} = props;

  if (route.key === 'first') {
    return (
      <Image
        source={{
          uri: 'https://thumbs.dreamstime.com/b/pepperoni-pizza-black-background-visit-my-page-you-will-be-able-to-find-image-every-sold-your-cafe-restaurant-117753303.jpg',
        }}
        style={{width: 30, height: 30, borderRadius: 50}}
        resizeMode={'contain'}
      />
    );
  }
  if (route.key === 'second') {
    return (
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyJTIwcG5nfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        }}
        style={{width: 30, height: 30, borderRadius: 50}}
        resizeMode={'contain'}
      />
    );
  }
  if (route.key === 'third') {
    return (
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/175265521/photo/chocolate-cupcake-red-frosting-and-candle-smoke.jpg?s=612x612&w=0&k=20&c=cw3xhfq6ruIzJoxI_pVt1yDmA8eEjjst1XqSq8Z81D8=',
        }}
        resizeMode={'contain'}
        style={{width: 30, height: 30, borderRadius: 50}}
      />
    );
  }
  if (route.key === 'fourth') {
    return (
      <Image
        source={{
          uri: 'https://africa-images.com/public/photos/7/l/7l4UYssAVas6LqtLkCjmQRzz9/7l4UYssAVas6LqtLkCjmQRzz9_small.jpg',
        }}
        resizeMode={'contain'}
        style={{width: 30, height: 30, borderRadius: 50}}
      />
    );
  }
};

export default function Landing({navigation}) {
  const [offers, setOffers] = React.useState([]);
  const getOffers = () => {
    const offerRef = database().ref(`offers/`);
    offerRef.on('value', snapshot => {
      const data = snapshot.val();
      data ? setOffers(Object.values(data).reverse()) : null;
      setOffers(Object.values(data));
    });
  };
  React.useEffect(() => {
    getOffers();
  }, []);
  // const offers = [
  //   'https://static.phdvasia.com/sg1/menu/combo/desktop_thumbnail_759f7f45-b6f2-4d3b-866e-b2d18a76f7d2.png',
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5dfA2i_3QVNRtO2J7sJIFphLOwI2pLARV_qb46khp0a-J7R_WGvpBNPwdoYfdcKOffBs&usqp=CAU',
  //   'https://www.pizzahut.com.bn/upload/images/packages/my-box-pizza-2022.jpg',
  //   'https://www.pizzahut.com.bn/upload/images/packages/FamilyBigBox-20210611.jpg',
  // ];
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Pizzas navigation={navigation} />;
      case 'second':
        return <Burgers navigation={navigation} />;
      case 'third':
        return <Deserts navigation={navigation} />;
      case 'fourth':
        return <Beverages navigation={navigation} />;
      default:
        return null;
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Pizzas'},
    {key: 'second', title: 'Burgers'},
    {key: 'third', title: 'Deserts'},
    {key: 'fourth', title: 'Drinks'},
  ]);

  return (
    <>
      <View style={{marginVertical: 5}}>
        {offers ? (
          <ScrollView style={{height: '10%'}} horizontal={true}>
            {offers.length > 0
              ? offers.map((offer, i) => (
                  <Image
                    key={i}
                    style={{
                      height: 70,
                      width: 210,
                      margin: 4,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: offer,
                    }}
                    resizeMode={'contain'}
                  />
                ))
              : null}
          </ScrollView>
        ) : null}
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
      />
    </>
  );
}
