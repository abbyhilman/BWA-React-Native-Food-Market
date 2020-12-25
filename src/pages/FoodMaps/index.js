import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components';
import MapboxGL from '@react-native-mapbox-gl/maps';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';

const accessToken =
  'pk.eyJ1IjoiYWJieWhpbG1hbiIsImEiOiJja2oxZWMzZWUxdzlyMnJxdDVqZGgyZm93In0.11pt0Wf6I_2yiXQtVAIRjg';

MapboxGL.setAccessToken(accessToken);

const directionsFoodStore = MapboxDirectionsFactory({accessToken});

const FoodMaps = ({navigation, route}) => {
  const {latitude, longitude} = route.params;
  const startingPoint = [longitude, latitude];
  const destinationPoint = [106.8768418, -6.1237135];
  const [show, setShow] = useState(null);

  const startDestinationPoints = [startingPoint, destinationPoint];

  useEffect(() => {
    fetchRoute();
  });
  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [
        {coordinates: startingPoint},
        {coordinates: destinationPoint},
      ],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };

    const res = await directionsFoodStore.getDirections(reqOptions).send();

    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setShow(newRoute);
  };
  const renderAnnotations = () => {
    return startDestinationPoints.map((point, index) => (
      <MapboxGL.PointAnnotation
        key={`${index}-PointAnnotation`}
        id={`${index}-PointAnnotation`}
        coordinate={point}>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#00cccc',
            borderRadius: 50,
            borderColor: '#fff',
            borderWidth: 3,
          }}
        />
      </MapboxGL.PointAnnotation>
    ));
  };

  return (
    <View style={styles.page}>
      <Header
        title="Store Maps"
        subTitle="Find your food view"
        onBack={() => navigation.goBack()}
      />
      <View styel={styles.map}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={11}
          centerCoordinate={startingPoint}
          style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={startingPoint}
            animationMode={'flyTo'}
            animationDuration={0}
          />
          {renderAnnotations()}
          {show && (
            <MapboxGL.ShapeSource id="shapeSource" shape={show}>
              <MapboxGL.LineLayer
                id="lineLayer"
                style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default FoodMaps;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '92%',
  },
  PointAnnotation: {
    height: 30,
    width: 30,
    backgroundColor: '#00cccc',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
});
