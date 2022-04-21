import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import RegisterScreen from './src/screens/account/RegisterScreen';
// import LoginScreen from './src/screens/account/LoginScreen';
// import ChooseScreen from './src/screens/ChooseScreen';
// import ChooseCompanyScreen from './src/screens/account/ChooseCompanyScreen';
// import VendorScreen_Manager from './src/screens/vendor_Manager/VendorScreen_Manager';
// import SaleDress from './src/components/vendor_Manager/SaleDress';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';
// import AdminScreen from './src/screens/admin/AdminScreen';
// import RegisterResidenceScreen from './src/screens/admin/RegisterResidenceScreen';
// import AboutWorkScreen from './src/screens/directorAndManager/AboutWorkScreen';
// import SupplierStatisticsScreen from './src/screens/directorAndManager/SupplierStatisticsScreen';
// import LaStoriaWareHouseScreen from './src/screens/directorAndManager/LaStoriaWareHouseScreen';
// import AboutShopsScreen from './src/screens/directorAndManager/AboutShopsScreen';
// import AboutSalonScreen from './src/screens/directorAndManager/AboutSalonScreen';
// import CostsRegister from './src/screens/directorAndManager/CostsRegister';
// import CostTypesScreen from './src/screens/directorAndManager/CostTypesScreen';
// import DressById from './src/components/vendor/DressById';
// import SupplierScreen from './src/screens/supplier/SupplierScreen';
// import WareHouseScreen from './src/screens/warehouse/WareHouseScreen';
// import SalonScreen from './src/screens/salon/SalonScreen';
// import LaStoriaNewsScreen from './src/screens/salon/LaStoriaNewsScreen';
// import MainPageScreen from './src/screens/directorAndManager/MainPageScreen';
// import OrdersListScreen from './src/screens/warehouse/OrdersListScreen';
// import OrdersById from './src/components/warehouse/OrdersById';
// import ReportScreen from './src/screens/directorAndManager/ReportScreen';
// import ReportOrders from './src/components/vendor/ReportOrders';
import ChooseScreen from './src/ChooseScreen';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <ChooseScreen />
        {/* <Stack.Navigator> */}
        {/* <Stack.Screen
        name="ChooseScreen"
        component={ChooseScreen}
        options={{
          headerShown: false,
        }}
      /> */}
        {/* Admin */}
        {/* <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          component={RegisterResidenceScreen}
          name="RegisterResidenceScreen"
        /> */}
        {/* Director Manager */}
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
        {/* <Stack.Screen
          name="MainPageScreen"
          component={MainPageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="AboutWorkScreen" component={AboutWorkScreen} />
        <Stack.Screen
          name="SupplierStatisticsScreen"
          component={SupplierStatisticsScreen}
          options={{headerTitle: 'Yetkazib berish'}}
        />
        <Stack.Screen
          name="LaStoriaWareHouseScreen"
          component={LaStoriaWareHouseScreen}
        /> */}
        {/* bu page`ni ham kamaytirsa boladi. */}
        {/* <Stack.Screen name="AboutShopsScreen" component={AboutShopsScreen} />
        <Stack.Screen name="AboutSalonScreen" component={AboutSalonScreen} />
        <Stack.Screen
          name="CostsRegister"
          component={CostsRegister}
          options={{title: "Xarajat qo'shish"}}
        /> */}
        {/* Manager */}
        {/* <Stack.Screen
          name="CostTypesScreen"
          component={CostTypesScreen}
          options={{headerShown: false}}
        /> */}
        {/* Manager uchun boshqalarni register qilish oynasini tayyor qilish kerak . shart emas ekan.*/}
        {/* Sotuvchi - Vendor */}
        {/* <Stack.Screen
        name="VendorScreen_Manager"
        component={VendorScreen_Manager}
        options={{headerShown: false}}
      /> */}
        {/* <Stack.Screen name="SaleDress" component={SaleDress} /> */}
        {/* <Stack.Screen
          name="DressById"
          component={DressById}
          options={{headerTitle: "Sotilgan ko'ylak"}}
        />

        <Stack.Screen
          name="ReportOrders"
          component={ReportOrders}
          options={{headerTitle: 'Otchet topshirish buyurtmalar'}}
        /> */}
        {/* Supplier */}
        {/* <Stack.Screen
          name="SupplierScreen"
          component={SupplierScreen}
          options={{headerShown: false}}
        /> */}
        {/* Omborchi == WAREHOUSE */}
        {/* <Stack.Screen name="WareHouseScreen" component={WareHouseScreen} />

        <Stack.Screen name="OrdersListScreen" component={OrdersListScreen} />

        <Stack.Screen name="OrdersById" component={OrdersById} /> */}

        {/* Salonchi== SALON */}
        {/* <Stack.Screen
          name="SalonScreen"
          component={SalonScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LaStoriaNewsScreen"
          component={LaStoriaNewsScreen}
          options={{title: 'Yangiliklar'}}
        /> */}
        {/* <Stack.Screen
        name="ChooseCompanyScreen"
        component={ChooseCompanyScreen}
        options={{headerShown: false}}
      /> */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
