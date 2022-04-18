import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';

const ReportScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Header headerName={'Otchet'} />

      <DoubleBtn firstBtnName={'Buyurtmalar'} secondBtnName={'Xarajatlar'} />
    </ScrollView>
  );
};

export default ReportScreen;
