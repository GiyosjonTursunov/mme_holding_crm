import {SafeAreaView, View, Text, FlatList} from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tw from 'twrnc';
import ListOrderedDresses from '../../components/warehouse/ListOrderedDresses';
import WareHouseScreen from './WareHouseScreen';
import DoubleBtn from '../../components/global/DoubleBtn';

const Stack = createNativeStackNavigator();

const OrdersListScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Header headerName={'Buyurtmalar'} />

      <DoubleBtn
        firstBtnName={'Buyurtmalar'}
        firstBtnFunction={() => navigation.navigate('OrdersListScreen')}
        secondBtnName={'Ombor'}
        secondBtnFunction={() => navigation.navigate('WareHouseScreen')}
      />

      <ListOrderedDresses />
    </SafeAreaView>
  );
};

export default OrdersListScreen;
