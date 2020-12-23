import Axios from 'axios';
import {API_HOST} from '../../config';
import {showMessage} from '../../utils';
import {setLoading} from './global';

export const getFoodData = () => (dispatch) => {
  Axios.get(`${API_HOST.url}/food`)
    .then((res) => {
      //console.log('res food: ', res.data.data.data);
      dispatch(setLoading(false));
      dispatch({type: 'SET_FOOD', value: res.data.data.data});
    })
    .catch((err) => {
      showMessage(err?.response?.message || 'Terjadi Kesalahan');
      dispatch(setLoading(false));
    });
};

export const getFoodDataByTypes = (types) => (dispatch) => {
  Axios.get(`${API_HOST.url}/food?types=${types}`)
    .then((res) => {
      //console.log('res food: ', res.data.data.data);
      if (types === 'new_food') {
        dispatch({type: 'SET_NEW_TASTE', value: res.data.data.data});
        dispatch(setLoading(false));
      }
      if (types === 'popular') {
        dispatch({type: 'SET_POPULAR', value: res.data.data.data});
        dispatch(setLoading(false));
      }
      if (types === 'recommended') {
        dispatch({type: 'SET_RECOMMENDED', value: res.data.data.data});
        dispatch(setLoading(false));
      }
    })
    .catch((err) => {
      showMessage(err?.response?.message || 'Terjadi Kesalahan');
      dispatch(setLoading(false));
    });
};
