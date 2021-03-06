import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SignIn,
  Splashscreen,
  SignUp,
  SignUpAddress,
  SuccessSignUp,
  Home,
  Order,
  Profile,
  FoodDetail,
  OrderSummary,
  SuccessOrder,
  OrderDetail,
  EditProfile,
  FoodMaps,
  FoodSearch,
  FoodBaskets,
  ProfileImage,
  ProfileAddress,
} from '../pages';
import {BottomNavigator} from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={FoodSearch} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Keranjang" component={FoodBaskets} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={Splashscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAddress"
        component={SignUpAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessSignUp"
        component={SuccessSignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessOrder"
        component={SuccessOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodMaps"
        component={FoodMaps}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileImage"
        component={ProfileImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileAddress"
        component={ProfileAddress}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
