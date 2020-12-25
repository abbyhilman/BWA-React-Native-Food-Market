import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';
import {setLoading} from './global';

export const getOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.get(`${API_HOST.url}/transaction`, {
      headers: {
        Authorization: resToken.value,
      },
    })
      .then((res) => {
        dispatch({type: 'SET_ORDER', value: res.data.data.data});
        dispatch(setLoading(false));
      })
      .catch((err) => {
        showMessage(err?.response?.message || 'Terjadi Kesalahan');
        dispatch(setLoading(false));
      });
  });
};

export const getInProgress = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=PENDING`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=ON_DELIVERY`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2) => {
          const Pending = res1.data.data.data;
          const onDelivery = res2.data.data.data;
          dispatch({
            type: 'SET_IN_PROGRESS',
            value: [...Pending, ...onDelivery],
          });
        }),
      )
      .catch((err) => {
        console.log('InProgress Err: ', JSON.stringify(err, null, 4));
        showMessage(err?.response?.message || 'Terjadi Kesalahan');
      });
  });
};

export const getPastOrders = () => (dispatch) => {
  getData('token').then((resToken) => {
    Axios.all([
      Axios.get(`${API_HOST.url}/transaction?status=CANCELLED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=DELIVERED`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
      Axios.get(`${API_HOST.url}/transaction?status=SUCCESS`, {
        headers: {
          Authorization: resToken.value,
        },
      }),
    ])
      .then(
        Axios.spread((res1, res2, res3) => {
          const cancelled = res1.data.data.data;
          const delivered = res2.data.data.data;
          const success = res3.data.data.data;
          dispatch({
            type: 'SET_PAST_ORDERS',
            value: [...cancelled, ...delivered, ...success],
          });
        }),
      )
      .catch((err) => {
        showMessage(err?.response?.message || 'Terjadi Kesalahan');
      });
  });
};
