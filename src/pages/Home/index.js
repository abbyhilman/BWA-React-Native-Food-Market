import React, {useEffect, useState, useCallback} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, Foodcard, HomeTabSection, HomeProfile} from '../../components';
import {getFoodData, setLoading} from '../../redux/action';
import Geolocation from '@react-native-community/geolocation';
import {showMessage} from '../../utils';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {food} = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  //console.log(food);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodData());
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({type: 'SET_MAPS', value: position.coords});
      },
      (error) => {
        showMessage(error.message);
      },
      {enableHighAccuracy: false, timeout: 1000},
    );
  }, [dispatch]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFoodData());
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
            />
          }>
          <View style={styles.foodCardContainer}>
            <Gap width={24} />
            {food.map((itemFood) => {
              return (
                <Foodcard
                  key={itemFood.id}
                  image={{uri: itemFood.picturePath}}
                  text={itemFood.name}
                  rating={itemFood.rate}
                  onPress={() => navigation.navigate('FoodDetail', itemFood)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {
    flex: 1,
  },
});
