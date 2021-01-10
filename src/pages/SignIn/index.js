import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import {signInAction} from '../../redux/action/auth';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Image} from 'react-native';

MapboxGL.requestAndroidLocationPermissions();

const SignIn = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const [userInfo, setUserinfo] = useState({});
  const [userPhoto, setUserPhoto] = useState({});

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          //console.log('login info has error: ' + error);
          showMessage(error);
        } else {
          setUserinfo(user);
          setUserPhoto(user.picture.data);
          //console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
  };

  return (
    <View style={styles.page}>
      <Header title="Sign In" subTitle="Find your best ever meal" />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={24} />
        <Button text="Sign In" onPress={onSubmit} />
        <Gap height={12} />
        <Button
          text="Create New Account"
          color="#8D92A3"
          textColor="white"
          onPress={() => navigation.navigate('SignUp')}
        />
        <View style={styles.loginFB}>
          <LoginButton
            publishPermissions={['publish_actions']}
            onLoginFinished={(error, result) => {
              if (error) {
                //console.log('login has error: ' + result.error);
                showMessage(result.error);
              } else if (result.isCancelled) {
                //console.log('login is cancelled.');
                showMessage('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  const accessToken = data.accessToken.toString();
                  //console.log(accessToken);
                  getInfoFromToken(accessToken);
                });
              }
            }}
            onLogoutFinished={() => setUserinfo({})}
          />
          {userInfo.name && (
            <View
              style={{
                width: 150,
                height: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: userPhoto.url}}
                style={{width: 50, height: 50, borderRadius: 50 / 2}}
              />
              <Text style={{fontSize: 16, marginVertical: 16}}>
                Logged in As {userInfo.name}
              </Text>
            </View>
          )}
          {/* <LoginButton
            publishPermissions={['email']}
            onLoginFinished={(error, result) => {
              if (error) {
                Alert.alert('Login failed with error: ' + error.message);
              } else if (result.isCancelled) {
                Alert.alert('Login was cancelled');
              } else {
                Alert.alert(
                  'Login was successful with permissions: ' +
                    result.grantedPermissions,
                );
              }
              console.log(result);
            }}
            onLogoutFinished={() => Alert.alert('User logged out')}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default SignIn;

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
  loginFB: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
