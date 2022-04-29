import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FiftySale from '../../components/vendor_Manager/sale/FiftySale';
import VendorScreen from './VendorScreen';
import OrderDress from '../../components/vendor_Manager/order/OrderDress';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import {useNavigation} from '@react-navigation/native';
import ThreeBtn from '../../components/global/ThreeBtn';
import DebtorsScreen from '../vendor_Manager/DebtorsScreen';

const Stack = createNativeStackNavigator();

const VendorMainScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} />
      <ThreeBtn
        firstBtnName={'Hammasi'}
        firstBtnNavigation={() => navigation.navigate('VendorScreen')}
        secondBtnName={'50/50'}
        secondBtnNavigation={() => navigation.navigate('FiftySale')}
        thirdBtnName={'Zakaz'}
        thirdBtnNavigation={() => navigation.navigate('OrderDress')}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="VendorScreen"
          component={VendorScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FiftySale"
          component={FiftySale}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDress"
          component={OrderDress}
          options={{headerShown: false}}
        />
        <Stack.Screen name="DebtorsScreen" component={DebtorsScreen} />
      </Stack.Navigator>

      <TouchableOpacity
        onPress={() => navigation.navigate('DebtorsScreen')}
        style={tw`w-15 h-15 absolute bottom-[20%] right-5`}>
        <Text style={tw`text-6xl m-auto`}>💰</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VendorMainScreen;
