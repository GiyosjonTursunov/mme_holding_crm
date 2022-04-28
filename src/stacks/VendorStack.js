import React from 'react';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FiftySale from '../components/vendor_Manager/sale/FiftySale';
import VendorScreen from '../screens/vendor/VendorScreen';
import OrderDress from '../components/vendor_Manager/order/OrderDress';
import tw from 'twrnc';
import Header from '../components/global/Header';
import DoubleBtn from '../components/global/DoubleBtn';
import {useNavigation} from '@react-navigation/native';
import ThreeBtn from '../components/global/ThreeBtn';

const Stack = createNativeStackNavigator();

const VendorStack = () => {
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
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default VendorStack;
