import Axios from 'axios';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import {API_HOST} from '../../config';
import {useDispatch} from 'react-redux';
import {getData, showMessage, storeData, useForm} from '../../utils';
import {setLoading} from '../../redux/action';

const EditProfile = ({navigation}) => {
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: '',
    city: '',
    houseNumber: '',
    phoneNumber: '',
  });
  const dispatch = useDispatch();
  const onSubmit = () => {
    let resultObj = {};
    Object.keys(form).map((obj) => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    dispatch(setLoading(true));
    getData('token').then((resToken) => {
      Axios.post(`${API_HOST.url}/user`, resultObj, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then((res) => {
          showMessage('Update Success', 'success');
          storeData('userProfile', res.data.data).then(() => {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            dispatch(setLoading(false));
          });
        })
        .catch((err) => {
          showMessage(
            `${err?.response?.data?.message} on Update Profile API` ||
              'Terjadi kesalahan di API Update Profile',
          );
          dispatch(setLoading(false));
        });
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Edit Profile"
          subTitle="Update your Profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value={form.name}
            onChangeText={(value) => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={(value) => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your House Number"
            value={form.houseNumber}
            onChangeText={(value) => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your Phone Number"
            value={form.phoneNumber}
            onChangeText={(value) => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={(value) => setForm('city', value)}
          />
          <Gap height={24} />
          <Button text="Continue" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
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
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {flexGrow: 1},
});
