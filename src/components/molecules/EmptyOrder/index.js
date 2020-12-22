import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button, Gap} from '../../atoms';
import {useNavigation} from '@react-navigation/native';

const EmptyOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <LottieView
        source={require('../../../assets/Animation/order-ready.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Gap height={30} />
      <Text style={styles.title}>Ouch! Hungry</Text>
      <Gap height={6} />
      <Text style={styles.subsTitle}>Seems like you have not</Text>
      <Text style={styles.subsTitle}>ordered any food yet</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Finds Food"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
    </View>
  );
};

export default EmptyOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
  animation: {
    width: 200,
    height: 200,
    position: 'relative',
  },
});
