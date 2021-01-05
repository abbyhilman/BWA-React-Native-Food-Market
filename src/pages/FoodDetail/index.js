import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {IcBackWhite} from '../../assets';
import {Button, Counter, Number, Rating} from '../../components';
import {getData, storeData} from '../../utils';
import {getPreciseDistance, convertDistance} from 'geolib';
import {addToCart} from '../../redux/action';
import PushNotification from 'react-native-push-notification';

const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: 'Local Notification Demo',
    title: 'Local Notification Title',
    message: 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};

const FoodDetail = ({navigation, route}) => {
  const {
    id,
    name,
    picturePath,
    description,
    ingredients,
    price,
    rate,
  } = route.params;
  const [totalItem, setTotalIteam] = useState(1);
  const [userProfile, setUserProfile] = useState({});
  const dispatch = useDispatch();

  const {coordinate} = useSelector((state) => state.mapsReducer);

  useEffect(() => {
    getData('userProfile').then((res) => {
      setUserProfile(res);
    });
  }, []);

  const onCounterChange = (value) => {
    setTotalIteam(value);
  };

  const calculatePreciseDistance = getPreciseDistance(
    {latitude: coordinate.latitude, longitude: coordinate.longitude},
    {latitude: -6.1237135, longitude: 106.8768418},
  );

  const onOrder = () => {
    const totalPrice = totalItem * price;
    const driver = 50000;
    const tax = (10 / 100) * totalPrice;
    const total = totalPrice + driver + tax;
    const data = {
      item: {
        id,
        name,
        price,
        picturePath,
      },
      transaction: {
        totalItem,
        totalPrice,
        driver,
        tax,
        total,
      },
      userProfile,
    };
    //console.log('data for checkout', JSON.stringify(data, null, 4));
    navigation.navigate('OrderSummary', data);
  };
  const onBasket = () => {
    const totalPrice = totalItem * price;
    const driver = 50000;
    const tax = (10 / 100) * totalPrice;
    const total = totalPrice + driver + tax;
    const data = {
      id,
      name,
      price,
      picturePath,
      totalItem,
      totalPrice,
      driver,
      tax,
      total,
      userProfile,
    };
    //storeData('foodCart', data);
    dispatch(addToCart(data));
    //dispatch({type: 'SET_BASKETS', value: data.item});
    navigation.replace('MainApp', {
      screen: 'Keranjang',
    });
  };
  return (
    <View style={styles.page}>
      <ImageBackground
        source={{uri: picturePath}}
        style={styles.cover}
        resizeMode="stretch">
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <IcBackWhite />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.mainContent}>
            <View style={styles.productContainer}>
              <View>
                <Text styles={styles.title}>{name}</Text>
                <Rating number={rate} />
              </View>
              <Counter onValueChange={onCounterChange} />
            </View>
            <Text style={styles.desc}>{description}</Text>
            <Text style={styles.label}>Ingredients:</Text>
            <Text style={styles.desc}>{ingredients}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('FoodMaps', coordinate)}>
              <Text style={styles.label}>Food Store Maps</Text>
            </TouchableOpacity>
            <Text style={styles.desc}>
              Distance with you location:{' '}
              {convertDistance(calculatePreciseDistance, 'km')} KM
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.labelTotal}>Total Price:</Text>
            <Number number={totalItem * price} style={styles.priceTotal} />
          </View>
          <View style={styles.buttonContainer}>
            <Button text="Keranjang" onPress={onBasket} />
          </View>
          <View style={styles.buttonContainer}>
            <Button text="Order Now" onPress={onOrder} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cover: {
    height: 330,
    paddingTop: 26,
    paddingLeft: 22,
  },
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: 115,
    marginHorizontal: 10,
  },
  labelTotal: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  priceTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
});
