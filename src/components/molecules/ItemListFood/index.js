import moment from 'moment';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Number, Rating} from '..';
import {IcAdd} from '../../../assets';

/*
Type: 
1. product,
2. order-summary,
3. im progress,
4. past order
*/

const ItemListFood = ({
  image,
  onPress,
  items,
  rating,
  price,
  type,
  name,
  date,
  status,
  disabled,
  Add,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'product':
        // item list product like in home page
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating number={rating} />
          </>
        );
      case 'product-newtaste':
        // item list product like in home page
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <TouchableOpacity style={styles.circle} onPress={Add}>
              <View style={styles.myButton}>
                <IcAdd />
              </View>
            </TouchableOpacity>
          </>
        );
      case 'order-summary':
        // item order summary
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Text style={styles.item}>{items} items</Text>
          </>
        );
      case 'in-progress':
        // item in-progress
        var formatedDate = moment.unix(date).format('MMM D Y, h:mm a');
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
            <View>
              <Text style={styles.date}>{formatedDate}</Text>
              <Text style={styles.status(status)}>{status}</Text>
            </View>
          </>
        );
      case 'past-orders':
        // item past-orders
        var formatedDate = moment.unix(date).format('MMM D Y, h:mm a');
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number number={price} style={styles.price} />
              </View>
            </View>
            <View>
              <Text style={styles.date}>{formatedDate}</Text>
              <Text style={styles.status(status)}>{status}</Text>
            </View>
          </>
        );
      default:
        // item product
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating rating={rating} />
          </>
        );
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F6F7FB',
    alignItems: 'center',
    width: 315,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    marginRight: 12,
  },
  content: {flex: 1},
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  price: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  item: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  date: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  status: (status) => ({
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: status === 'CANCELLED' ? '#D9435E' : '#1ABC9C',
  }),
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D92A3',
    marginHorizontal: 4,
  },
  circle: {
    marginBottom: -40,
  },
  myButton: {
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
    backgroundColor: '#FFC700',
    alignItems: 'center',
    padding: 10,
  },
});
