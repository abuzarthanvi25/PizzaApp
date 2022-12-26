import * as React from 'react';
import {useWindowDimensions, Text, Image} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Pizzas from './Pizzas';
import Deserts from './Deserts';
import Burgers from './Burgers';
import Beverages from './Beverages';

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
      marginTop: 20,
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
        style={{width: 35, height: 35, borderRadius: 50}}
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
        style={{width: 35, height: 35, borderRadius: 50}}
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
        style={{width: 35, height: 35, borderRadius: 50}}
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
        style={{width: 35, height: 35, borderRadius: 50}}
      />
    );
  }
};

const renderScene = SceneMap({
  first: Pizzas,
  second: Burgers,
  third: Deserts,
  fourth: Beverages,
});

export default function Landing() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Pizzas'},
    {key: 'second', title: 'Burgers'},
    {key: 'third', title: 'Deserts'},
    {key: 'fourth', title: 'Drinks'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}
