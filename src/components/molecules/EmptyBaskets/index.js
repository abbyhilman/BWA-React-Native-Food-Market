import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Empty_baskets} from '../../../assets';
import {Button, Gap} from '../../atoms';

const EmptyBaskets = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <Image source={Empty_baskets} style={styles.animation} />
      <Gap height={30} />
      <Text style={styles.title}>Your Baskets is Empty</Text>
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

export default EmptyBaskets;

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
