import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VendorScreen_Manager from '../screens/vendor_Manager/VendorScreen_Manager';
import SaleDress from '../components/vendor_Manager/SaleDress';
import ReportSales from '../components/vendor_Manager/ReportSales';
import DebtorsScreen from '../screens/vendor_Manager/DebtorsScreen';

const Stack = createNativeStackNavigator();

const VendorManagerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorScreen_Manager"
        component={VendorScreen_Manager}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SaleDress" component={SaleDress} />
      <Stack.Screen name="ReportSales" component={ReportSales} />
      <Stack.Screen name="DebtorsScreen" component={DebtorsScreen} />
    </Stack.Navigator>
  );
};

export default VendorManagerStack;
