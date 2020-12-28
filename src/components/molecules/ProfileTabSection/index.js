import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View, Dimensions} from 'react-native';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ItemListMenu} from '..';
import {useNavigation} from '@react-navigation/native';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
      width: '15%',
      marginLeft: '3%',
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const Account = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu
        text="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <ItemListMenu text="Home Address" onPress={() => {}} />
      <ItemListMenu text="Sign Out" onPress={signOut} />
    </View>
  );
};

const FoodMarket = () => {
  //const navigation = useNavigation();
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListMenu text="Rate App" onPress={() => {}} />
      <ItemListMenu text="Help Center" onPress={() => {}} />
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const ProfileTabSection = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'FoodMarket'},
  ]);

  const renderScene = SceneMap({
    1: Account,
    2: FoodMarket,
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default ProfileTabSection;

//const styles = StyleSheet.create({});
