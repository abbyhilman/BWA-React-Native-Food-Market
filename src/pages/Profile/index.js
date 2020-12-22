import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {ProfileTabSection} from '../../components';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

const Profile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    navigation.addListener('focus', () => {
      updateUserProfile();
    });
  }, [navigation]);

  const updateUserProfile = () => {
    getData('userProfile').then((res) => {
      setUserProfile(res);
    });
  };

  const updatePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 0.7,
      },
      (response) => {
        //console.log('Response = ', response);
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          const photoForUpload = new FormData();
          photoForUpload.append('file', dataImage);
          getData('token').then((resToken) => {
            Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
              headers: {
                Authorization: resToken.value,
                'Content-Type': 'multipart/form-data',
              },
            })
              .then((res) => {
                getData('userProfile').then((resUser) => {
                  resUser.profile_photo_url = `http://bb6bc0b12621.ngrok.io/foodmarket_react_native/public/storage/${res.data.data[0]}`;
                  storeData('userProfile', resUser).then(() => {
                    updateUserProfile();
                  });
                  showMessage('Berhasil Update Photo', 'success');
                });
              })
              .catch((err) => {
                showMessage(err?.response?.message || 'Terjadi Kesalahan');
              });
          });
        }
      },
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.profileContainer}>
        <View style={styles.photo}>
          <View style={styles.borderPhoto}>
            <TouchableOpacity onPress={updatePhoto}>
              <Image
                source={{uri: userProfile.profile_photo_url}}
                style={styles.photoContainer}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {flex: 1},
  profileContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 26,
  },
  content: {
    flex: 0.62,
    backgroundColor: 'white',
    marginTop: 24,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    padding: 24,
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: '#F0F0F0',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
  email: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
});
