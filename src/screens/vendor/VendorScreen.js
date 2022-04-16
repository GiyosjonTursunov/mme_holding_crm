import React from 'react';
import {SafeAreaView} from 'react-native';
import tw from 'twrnc';
import All from '../../components/vendor/All';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Sales from /'../../components/vendor/Sales';
import Fifty from '../../components/vendor/Fifty';
const Stack = createNativeStackNavigator();
import ThreeBtn from '../../components/global/ThreeBtn';
import Header from '../../components/global/Header';
import {useNavigation} from '@react-navigation/native';
import OrderDress from '../../components/vendor/OrderDress';

const VendorScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} isRegister={true} />
      <ThreeBtn
        firstBtnName={'Hammasi'}
        firstBtnNavigation={() => navigation.navigate('All')}
        secondBtnName={'Sotish'}
        secondBtnNavigation={() => navigation.navigate('OrderDress')}
        thirdBtnName={'50/50'}
        thirdBtnNavigation={() => navigation.navigate('Fifty')}
      />

      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="All"
          component={All}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="OrderDress"
          component={OrderDress}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Sales"
          component={Sales}
        /> */}
        <Stack.Screen
          options={{headerShown: false}}
          name="Fifty"
          component={Fifty}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default VendorScreen;
