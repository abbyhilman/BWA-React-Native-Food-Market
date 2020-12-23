import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {FoodDummy} from '../../assets';
import {Gap, Foodcard, HomeTabSection, HomeProfile} from '../../components';
import {getFoodData, setLoading} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {food} = useSelector((state) => state.homeReducer);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodData());
  }, [dispatch]);
  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.foodCardContainer}>
            <Gap width={24} />
            {food.map((itemFood) => {
              return (
                <Foodcard
                  key={itemFood.id}
                  image={{uri: itemFood.picturePath}}
                  //image={FoodDummy}
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
        <ScrollView>
          <HomeTabSection />
        </ScrollView>
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
