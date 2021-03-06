import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gap} from '../../components';
import LottieView from 'lottie-react-native';
import {Success_signUp} from '../../assets';

const SuccessSignUp = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Success_signUp />
      <LottieView
        source={require('../../assets/Animation/10086-well-done.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Gap height={30} />
      <Text style={styles.title}>Yeay! Completed</Text>
      <Gap height={6} />
      <Text style={styles.subsTitle}>Now you are able to order</Text>
      <Text style={styles.subsTitle}>some foods as a self-reward</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Finds Food"
          onPress={() =>
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]})
          }
        />
      </View>
    </View>
  );
};

export default SuccessSignUp;

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
    position: 'absolute',
    marginVertical: -50,
  },
});
