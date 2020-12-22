import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyOrder, Header, OrderTabSection} from '../../components';
import {getOrders} from '../../redux/action';

const Order = () => {
  const dispatch = useDispatch();
  const {orders} = useSelector((state) => state.orderReducer);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <View style={styles.page}>
      {orders.length < 1 ? (
        <EmptyOrder />
      ) : (
        <View style={styles.content}>
          <Header title="Your Orders" subTitle="Wait for the best meal" />
          <View style={styles.OrdertabContainer}>
            <ScrollView>
              <OrderTabSection />
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  OrdertabContainer: {
    flex: 1,
    marginTop: 24,
  },
  content: {flex: 1},
});
