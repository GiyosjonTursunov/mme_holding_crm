import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import WareHouseMainScreen from '../screens/wareHouseManager/WareHouseMainScreen';
import ListOrderedDresses from '../components/warehouse/ListOrderedDresses';
import OrdersById from '../screens/wareHouseManager/OrdersById';

const Stack = createNativeStackNavigator();

const WareHouseManagerStack = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Stack.Navigator>
        <Stack.Screen
          name="ListOrderedDresses"
          component={ListOrderedDresses}
        />
        <Stack.Screen
          name="WareHouseMainScreen"
          component={WareHouseMainScreen}
        />
        <Stack.Screen name="OrdersById" component={OrdersById} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default WareHouseManagerStack;
