import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {HouseAnimation, Logo} from '../../assets';
import LottieView from 'lottie-react-native';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then((res) => {
        //console.log('token: ', res);
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2500);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation/house-animation.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.titleSplash}>FoodMarket</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFC700',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSplash: {
    fontSize: 32,
    color: '#020202',
    marginVertical: 38,
    fontFamily: 'Poppins-Medium',
  },
  animation: {
    width: 200,
    height: 200,
    position: 'relative',
  },
});
