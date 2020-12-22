import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../../components';
import LottieView from 'lottie-react-native';

const SuccessOrder = ({navigation}) => {
  return (
    <View style={styles.page}>
      <LottieView
        source={require('../../assets/Animation/21653-delivery-guy-out-for-delivery.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Gap height={30} />
      <Text style={styles.title}>You’ve Made Order</Text>
      <Gap height={6} />
      <Text style={styles.subsTitle}>Just stay at home while we are</Text>
      <Text style={styles.subsTitle}>preparing your best foods</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Order Other Foods"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
      <Gap height={12} />
      <View style={styles.buttonContainer}>
        <Button
          text="View My Order"
          onPress={() => navigation.replace('MainApp', {screen: 'Order'})}
          color="#8D92A3"
          textColor="#F9FAFF"
        />
      </View>
    </View>
  );
};

export default SuccessOrder;

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
