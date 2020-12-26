import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {HouseAnimation, Logo} from '../../assets';
import LottieView from 'lottie-react-native';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  // useEffect(() => {

  // }, [navigation]);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation/lf30_editor_r9rfezh5.json')}
        autoPlay
        loop={false}
        speed={0.7}
        style={styles.animation}
        onAnimationFinish={() => {
          setTimeout(() => {
            getData('token').then((res) => {
              //console.log('token: ', res);
              if (res) {
                navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
              } else {
                navigation.replace('SignIn');
              }
            });
          }, 1500);
        }}
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
    width: 100,
    height: 100,
    position: 'relative',
  },
});
