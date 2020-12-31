import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AddressCard, Button, Header} from '../../components';
import {getData} from '../../utils';

const ProfileAddress = ({navigation}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then((res) => {
        setData(res);
      });
    });
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Header
        title="Home Address"
        subTitle="List Address"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.button}>
        <Button text="Tambah Alamat" onPress={() => {}} />
      </View>
      <View style={styles.addressContainer}>
        <AddressCard
          title="Alamat Rumah"
          name={data.name}
          phoneNum={data.phoneNumber}
          address={data.address}
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    </View>
  );
};

export default ProfileAddress;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  addressContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  button: {
    width: 163,
    marginTop: 24,
    marginLeft: 15,
  },
});
