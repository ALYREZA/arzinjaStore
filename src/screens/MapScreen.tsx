import React, {useContext, useRef, useState} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
  useWindowDimensions,
} from 'react-native';
import {MapView, Camera, setAccessToken, PointAnnotation} from '@rnmapbox/maps';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BasketContext} from '../context/BasketContext';
import {CommonActions} from '@react-navigation/native';

setAccessToken(
  'sk.eyJ1IjoiZml5b3NpOTUxMiIsImEiOiJjbHBjc3hiYmUwdmxoMmxxcnhsdjZnM2w1In0.-Nby9QzR6bnMskcPkMUzCQ',
);

const MapScreen = ({route, navigation}) => {
  const {addItem} = useContext(BasketContext);
  const {name, category} = route.params;
  const {height} = useWindowDimensions();
  const cameraRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: 51.3347,
    longitude: 35.7219,
    screenPointX: undefined,
    screenPointY: undefined,
  });
  const bottomTabHeight = useBottomTabBarHeight();
  const {latitude, longitude} = location;

  const onMapPress = event => {
    const {geometry, properties} = event;

    setLocation({
      latitude: geometry.coordinates[0],
      longitude: geometry.coordinates[1],
      screenPointX: properties.screenPointX,
      screenPointY: properties.screenPointY,
    });
    cameraRef.current?.setCamera({
      centerCoordinate: [geometry.coordinates[0], geometry.coordinates[1]],
      zoomLevel: 12,
      animationMode: 'flyTo',
    });
  };
  const onSubmit = () => {
    addItem({name, category, location: [latitude, longitude]});
    ToastAndroid.showWithGravity(
      'item added',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Basket'}],
      }),
    );
  };
  return (
    <View style={styles.page}>
      <View style={[styles.container, {height: height - bottomTabHeight}]}>
        <MapView onPress={onMapPress} style={styles.map}>
          <PointAnnotation id="pinter" coordinate={[latitude, longitude]} />
          <Camera
            zoomLevel={10}
            ref={cameraRef}
            defaultSettings={{centerCoordinate: [latitude, longitude]}}
          />
        </MapView>
      </View>
      <View style={[styles.boxWrapper]}>
        <TextInput
          style={styles.txt}
          editable={false}
          value={`${latitude},${longitude}`}
        />
        <Button onPress={onSubmit} title="submit" />
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    flex: 1,
  },
  container: {
    width: '100%',
  },
  map: {
    flex: 1,
    zIndex: 0,
  },
  txt: {
    color: 'black',
    paddingHorizontal: 12,
  },
  boxWrapper: {
    position: 'absolute',
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-evenly',
    left: 0,
    bottom: 0,
    right: 0,
    height: 150,
    backgroundColor: 'white',
  },
});
