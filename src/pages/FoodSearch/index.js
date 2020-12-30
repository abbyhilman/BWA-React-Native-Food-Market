import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import filter from 'lodash.filter';
import {useDispatch, useSelector} from 'react-redux';
import {ItemListFood} from '../../components/molecules';
import {getFoodData, setLoading} from '../../redux/action';
import {SearchBar} from 'react-native-elements';

const FoodSearch = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const {food} = useSelector((state) => state.homeReducer);
  const [data, setData] = useState(food);
  const [show, setShow] = useState(false);
  // console.log(JSON.stringify(data, null, 4));

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getFoodData());
  }, [dispatch]);

  const updateSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(food, (name) => {
      return contains(name, formattedQuery);
    });
    setData(filteredData);
    setSearch(text);
    setShow(true);
  };

  const contains = ({name}, query) => {
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  // const renderHeader = () => {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: '#fff',
  //         padding: 10,
  //         marginVertical: 10,
  //         borderRadius: 20,
  //       }}>
  //       <TextInput
  //         autoCapitalize="none"
  //         autoCorrect={true}
  //         clearButtonMode="always"
  //         value={search}
  //         onChangeText={(queryText) => updateSearch(queryText)}
  //         placeholder="Search Food"
  //         style={{backgroundColor: '#fff', paddingHorizontal: 20}}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={styles.page}>
      <SearchBar
        platform="android"
        placeholder="Type Here..."
        onChangeText={(queryText) => updateSearch(queryText)}
        value={search}
        cancelIcon={true}
      />
      <View style={styles.content}>
        {show && (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ItemListFood
                type="product"
                name={item.name}
                price={item.price}
                rating={item.rate}
                image={{uri: item.picturePath}}
                onPress={() => navigation.navigate('FoodDetail', item)}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default FoodSearch;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 5,
  },
});
