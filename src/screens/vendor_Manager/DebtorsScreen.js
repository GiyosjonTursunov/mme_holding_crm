// import {ScrollView} from 'react-native';
// import React from 'react';
// import tw from 'twrnc';
// import Header from '../../components/global/Header';
// import ThreeBtn from '../../components/global/ThreeBtn';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import DebtorsSales from '../../components/vendor_Manager/DebtorsSales';
// import {useNavigation} from '@react-navigation/native';
// import DebtorsFifty from '../../components/vendor_Manager/DebtorsFifty';
// import DebtorsOrders from '../../components/vendor_Manager/DebtorsOrders';

// const Stack = createNativeStackNavigator();

// const DebtorsScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <ScrollView style={tw`flex-1 bg-white`}>
//       <Header headerName={'Sotuvchi'} />
//       <ThreeBtn
//         firstBtnName={'Oddiy sotuv'}
//         firstBtnNavigation={() => navigation.navigate('DebtorsSales')}
//         secondBtnName={'50/50'}
//         secondBtnNavigation={() => navigation.navigate('DebtorsFifty')}
//         thirdBtnName={'Zakaz'}
//         thirdBtnNavigation={() => navigation.navigate('DebtorsOrders')}
//       />
//       <Stack.Navigator initialRouteName="DebtorsSales">
//         <Stack.Screen
//           name="DebtorsSales"
//           component={DebtorsSales}
//           options={{headerShown: false}}
//         />

//         <Stack.Screen
//           name="DebtorsFifty"
//           component={DebtorsFifty}
//           options={{headerShown: false}}
//         />

//         <Stack.Screen
//           name="DebtorsOrders"
//           component={DebtorsOrders}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </ScrollView>
//   );
// };

// export default DebtorsScreen;

import {SafeAreaView, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import DailySalesOrders from '../../components/vendor_Manager/DailySalesOrders';
import OrderDress from '../../components/vendor_Manager/order/OrderDress';
import ThreeBtn from '../../components/global/ThreeBtn';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DebtorsSales from '../../components/vendor_Manager/DebtorsSales';
import DebtorsFifty from '../../components/vendor_Manager/DebtorsFifty';
import DebtorsOrders from '../../components/vendor_Manager/DebtorsOrders';
const Stack = createNativeStackNavigator();

function VendorScreen_Manager() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Sotuvchi'} isRegister={true} />
      <ThreeBtn
        firstBtnName={'Oddiy sotuv'}
        firstBtnNavigation={() => navigation.navigate('DebtorsSales')}
        secondBtnName={'50/50'}
        secondBtnNavigation={() => navigation.navigate('DebtorsFifty')}
        thirdBtnName={'Zakaz'}
        thirdBtnNavigation={() => navigation.navigate('DebtorsOrders')}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="DebtorsSales"
          component={DebtorsSales}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DebtorsFifty"
          component={DebtorsFifty}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DebtorsOrders"
          component={DebtorsOrders}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

      {/* <TouchableOpacity onPress={() => navigation.navigate('ReportSales')}>
        <Image
          source={require('../../../assets/reportIcon.png')}
          style={tw`w-15 h-15 absolute bottom-10 right-5`}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('DebtorsScreen')}
        style={tw`w-15 h-15 absolute bottom-[20%] right-5`}>
        <Text style={tw`text-6xl m-auto`}>💰</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default VendorScreen_Manager;
