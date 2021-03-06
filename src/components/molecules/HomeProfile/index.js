import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Picture} from '../../../assets';
import {getData, showMessage} from '../../../utils';

const HomeProfile = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(Picture);
  useEffect(() => {
    navigation.addListener('focus', () => {
      getData('userProfile').then((res) => {
        setPhoto({uri: res.profile_photo_url});
      });
    });
  }, [navigation]);
  // const handleClick = () => {
  //   Linking.canOpenURL(photo.uri).then((supported) => {
  //     if (supported) {
  //       Linking.openURL(photo.uri);
  //     } else {
  //       showMessage('Tidak dapat membuka photo');
  //     }
  //   });
  // };
  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>FoodMarket</Text>
        <Text style={styles.desc}>Let’s get some foods</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileImage')}>
        <Image source={photo} style={styles.profile} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  appName: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
});
