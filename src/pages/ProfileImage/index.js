import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Picture} from '../../assets';
import {Button} from '../../components';
import {getData} from '../../utils';

const ProfileImage = ({navigation}) => {
  const [photo, setPhoto] = useState(Picture);
  getData('userProfile').then((res) => {
    setPhoto({uri: res.profile_photo_url});
  });
  return (
    <View style={styles.page}>
      <Button text="Done" onPress={() => navigation.goBack()} />
      <View style={{alignSelf: 'center', paddingTop: 150}}>
        <Image source={photo} style={styles.profile} />
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingRight: 10,
  },
  profile: {
    width: 200,
    height: 250,
    borderRadius: 8,
  },
});
