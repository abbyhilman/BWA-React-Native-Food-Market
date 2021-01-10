import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ItemListFood} from '..';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getFoodDataByTypes} from '../../../redux/action/home';
import {setLoading} from '../../../redux/action';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.TabBar}
    tabStyle={styles.tabStyle}
    renderLabel={({route, focused}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {newTaste} = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [food, setFood] = useState({});

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodDataByTypes('new_food'));
  }, [dispatch]);
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFoodDataByTypes('new_food'));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const toBasket = () => {
    //setFood(item);
    //console.log(food);
    navigation.navigate('Keranjang');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={true}
        />
      }>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {newTaste.map((item) => {
          return (
            <ItemListFood
              key={item.id}
              type="product-newtaste"
              name={item.name}
              price={item.price}
              image={{uri: item.picturePath}}
              onPress={() => navigation.navigate('FoodDetail', item)}
              Add={toBasket}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {popular} = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodDataByTypes('popular'));
  }, [dispatch]);
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFoodDataByTypes('popular'));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={true}
        />
      }>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {popular.map((item) => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              image={{uri: item.picturePath}}
              //image={FoodDummy}
              rating={item.rate}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};
const Recommended = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {recommended} = useSelector((state) => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodDataByTypes('recommended'));
  }, [dispatch]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getFoodDataByTypes('new_food'));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={true}
        />
      }>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {recommended.map((item) => {
          return (
            <ItemListFood
              key={item.id}
              type="product"
              name={item.name}
              price={item.price}
              image={{uri: item.picturePath}}
              rating={item.rate}
              onPress={() => navigation.navigate('FoodDetail', item)}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const HomeTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Taste'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: Recommended,
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: '#020202',
    height: 3,
    width: '15%',
    marginLeft: '3%',
  },
  TabBar: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {width: 'auto'},
});
