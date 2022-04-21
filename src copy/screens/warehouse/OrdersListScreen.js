import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import tw from 'twrnc';
import ListOrderedDresses from '../../components/warehouse/ListOrderedDresses';
import DoubleBtn from '../../components/global/DoubleBtn';

const OrdersListScreen = ({navigation}) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
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
