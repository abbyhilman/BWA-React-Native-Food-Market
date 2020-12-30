import React, {useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
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

const FoodBaskets = ({navigation}) => {
  const {cart, total} = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  //console.log(JSON.stringify(cart, null, 4));
  //console.log(JSON.stringify(total, null, 4));

  const onOrder = () => {
    {
      cart.map((res) => {
        const data = {
          item: {
            id: res.id,
            name: res.name,
            price: res.price,
            picturePath: res.picturePath,
          },
          transaction: {
            totalItem: res.totalItem,
            totalPrice: res.totalPrice,
            driver: res.driver,
            tax: res.tax,
          },
          userProfile: res.userProfile,
          total: total,
        };
        navigation.navigate('OrderSummary', data);
      });
    }
  };
  //console.log('data for checkout', JSON.stringify(data, null, 4));

  return (
    <View style={styles.page}>
      {cart.length !== 0 ? (
        <View style={styles.content}>
          <Header title="Your Baskets" subTitle="Order your food" />
          <View style={styles.OrdertabContainer}>
            <FlatList
              data={cart}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item}) => (
                <Swipeout
                  right={[
                    {
                      component: (
                        <TouchableOpacity
                          onPress={() => dispatch(removeItem(item))}
                          style={styles.deleteIconContainer}>
                          <Icon name="trash" size={28} color="#F05829" />
                        </TouchableOpacity>
                      ),
                      backgroundColor: '#fff',
                    },
                  ]}
                  autoClose={true}
                  backgroundColor="transparent"
                  buttonWidth={96}>
                  <ItemListFood
                    type="order-summary"
                    name={item.name}
                    price={item.totalPrice}
                    items={item.totalItem}
                    image={{uri: item.picturePath}}
                    //onPress={() => dispatch(removeItem(item))}
                  />
                </Swipeout>
              )}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.labelTotal}>Total Price:</Text>
              <Number number={total} style={styles.priceTotal} />
            </View>
            <View style={styles.buttonContainer}>
              <Button text="Order Now" onPress={onOrder} />
            </View>
          </View>
        </View>
      ) : (
        <EmptyBaskets />
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
  badge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  deleteIconContainer: {
    flex: 1,
    borderLeftColor: '#000',
    borderLeftWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 48,
  },
});
