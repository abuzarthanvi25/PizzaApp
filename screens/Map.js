import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

function Map() {
  const [lang, setlang] = useState('-345678');
  const [long, setlong] = useState('2345678');
  Geolocation.getCurrentPosition(info => {
    console.log(info.coords);
    setlang(info.coords.latitude);
    setlong(info.coords.longitude);
  });
  return (
    <>
      <View>
        <View>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            userInterfaceStyle="dark"
            style={{
              height: 500,
              width: 400,
            }}
            region={{
              latitude: lang,
              longitude: long,
              latitudeDelta: 0.009,
              longitudeDelta: 0.0009,
            }}>
            <Marker
              coordinate={{latitude: lang, longitude: long}}
              title="test description"
              pinColor="red"
              description="test description"></Marker>
          </MapView>
        </View>
      </View>
    </>
  );
}

export default Map;
