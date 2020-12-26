import Axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

export const signUpAction = (dataRegister, photoReducer, navigation) => (
  dispatch,
) => {
  Axios.post(`${API_HOST.url}/register`, dataRegister)
    .then((res) => {
      const profile = res.data.data.user;
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;

      storeData('token', {value: token});

      if (photoReducer.isUplaodPhoto) {
        const photoForUpload = new FormData();
        photoForUpload.append('file', photoReducer);
        Axios.post(`${API_HOST.url}/user/photo`, photoForUpload, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res) => {
            profile.profile_photo_url = `http://bf6e46578ad2.ngrok.io/storage/${res.data.data[0]}`;
            storeData('userProfile', profile);
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            //console.log('photo success', JSON.stringify(res, null, 4));
          })
          .catch((errUpload) => {
            showMessage(
              errUpload?.response?.message || 'Upload photo tidak berhasil',
            );
            navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
          });
      } else {
        storeData('userProfile', profile);
        navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
      }
      dispatch(setLoading(false));
    })
    .catch((err) => {
      showMessage(err?.response?.data?.data?.message);
      dispatch(setLoading(false));
    });
};

export const signInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/login`, form)
    .then((res) => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;

      storeData('token', {value: token});
      storeData('userProfile', profile);

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      dispatch(setLoading(false));
    })
    .catch((err) => {
      //showMessage('Please Insert your email and password');
      showMessage(err?.response?.data?.data?.message);
      dispatch(setLoading(false));
    });
};
