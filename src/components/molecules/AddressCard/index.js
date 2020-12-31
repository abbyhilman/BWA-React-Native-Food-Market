import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const AddressCard = ({title, name, phoneNum, address, onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} disabled={disabled}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <Text style={styles.SubName}>{name}</Text>
          <Text style={styles.SubPhone}>{phoneNum}</Text>
          <Text style={styles.Substitle}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    overflow: 'hidden',
    marginRight: 24,
  },
  content: {padding: 13},
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
    marginTop: 10,
    marginLeft: 10,
  },
  SubName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  SubPhone: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#020202',
  },
  Substitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
    color: '#020202',
  },
});
