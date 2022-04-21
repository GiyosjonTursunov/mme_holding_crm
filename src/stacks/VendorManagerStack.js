import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VendorScreen_Manager from '../screens/vendor_Manager/VendorScreen_Manager';
import SaleDress from '../components/vendor_Manager/SaleDress';

const Stack = createNativeStackNavigator();

const VendorManagerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorScreen_Manager"
        component={VendorScreen_Manager}
      />
      <Stack.Screen name="SaleDress" component={SaleDress} />
    </Stack.Navigator>
  );
};

export default VendorManagerStack;
