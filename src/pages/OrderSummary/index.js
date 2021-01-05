import Axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {
  Button,
  Gap,
  Header,
  ItemListFood,
  ItemValue,
  Loading,
} from '../../components';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';
import {WebView} from 'react-native-webview';
import {setLoading} from '../../redux/action/global';
import {emptyCart} from '../../redux/action';

const OrderSummary = ({navigation, route}) => {
  const {item, transaction, userProfile, total} = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentURL, setPaymentURL] = useState('https://buildwithangga.com');
  const dispatch = useDispatch();
  //console.log(item);

  const onCheckout = () => {
    dispatch(setLoading(true));
    const data = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total || transaction.totalPrice + total,
      status: 'PENDING',
    };
    getData('token').then((resToken) => {
      Axios.post(`${API_HOST.url}/checkout`, data, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then((res) => {
          //console.log('chechkout success: ', JSON.stringify(res.data, null, 4));
          setIsPaymentOpen(true);
          dispatch(setLoading(false));
          setPaymentURL(res.data.data.payment_url);
          storeData('Payment', paymentURL);
        })
        .catch((err) => {
          //console.log('chechkout err: ', JSON.stringify(err.response, null, 4));
          showMessage(
            err?.response?.data?.data?.message || 'Terjadi Kesalahan',
          );
          dispatch(setLoading(false));
        });
    });
    dispatch(emptyCart());
  };

  const onNavChange = (state) => {
    ///console.log('nav', state);
    //const urlSuccess = `${paymentURL}/select-payment`;
    //const urlSuccess = 'https://app.sandbox.midtrans.com/snap/v2/vtweb/934d7eba-9f1e-402f-ab1a-8155ec89bac9';
    const titleWeb = 'Laravel';
    if (state.title === titleWeb) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
    }
  };
  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Payment"
          subTitle="You deserve better meal"
          onBack={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{uri: paymentURL}}
          renderLoading={() => <Loading />}
          onNavigationStateChange={onNavChange}
        />
      </>
    );
  }
  return (
    <ScrollView>
      <Header
        title="Order Summary"
        subTitle="You deserve better meal"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood
          type="order-summary"
          name={item.name}
          price={item.price}
          image={{uri: item.picturePath}}
          items={transaction.totalItem}
        />
        <Text style={styles.label}>Details Trans action</Text>
        <ItemValue
          label={item.name}
          value={transaction.totalPrice}
          type="currency"
        />
        <ItemValue label="Driver" value={transaction.driver} type="currency" />
        <ItemValue label="Tax 10%" value={transaction.tax} type="currency" />
        <ItemValue
          label="Total Price"
          value={
            transaction.total || transaction.driver + transaction.tax + total
          }
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Name" value={userProfile.name} />
        <ItemValue label="Phone No." value={userProfile.phoneNumber} />
        <ItemValue label="Address" value={userProfile.address} />
        <ItemValue label="House No." value={userProfile.houseNumber} />
        <ItemValue label="City" value={userProfile.city} />
      </View>
      <View style={styles.button}>
        <Button text="Checkout Now" onPress={onCheckout} />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
