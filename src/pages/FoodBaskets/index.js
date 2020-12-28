import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  EmptyBaskets,
  Header,
  ItemListFood,
  Number,
} from '../../components';
import Swipeout from 'react-native-swipeout';
import {removeItem} from '../../redux/action';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodBaskets = () => {
  const {cart, total} = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  //console.log(JSON.stringify(cart, null, 4));

  var swipeoutBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        dispatch(removeItem(cart));
      },
      type: 'delete',
      component: (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Icon name="trash" size={30} color="#900" />
        </View>
      ),
    },
  ];
  return (
    <View style={styles.page}>
      {cart < 1 ? (
        <EmptyBaskets />
      ) : (
        <View style={styles.content}>
          <Header title="Your Baskets" subTitle="Order your food" />
          <View style={styles.OrdertabContainer}>
            <ScrollView>
              {cart.map((carts) => {
                return (
                  <Swipeout right={swipeoutBtns} autoClose="true">
                    <ItemListFood
                      type="order-summary"
                      key={carts.item.id}
                      name={carts.item.name}
                      price={carts.transaction.totalPrice}
                      items={carts.transaction.totalItem}
                      image={{uri: carts.item.picturePath}}
                    />
                  </Swipeout>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.labelTotal}>Total Price:</Text>
              <Number number={total} style={styles.priceTotal} />
            </View>
            <View style={styles.buttonContainer}>
              <Button text="Order Now" onPress={() => {}} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default FoodBaskets;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  OrdertabContainer: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 5,
  },
  content: {flex: 1},
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  food: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  priceContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: 115,
    marginHorizontal: 10,
  },
  labelTotal: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  priceTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#020202',
  },
});
