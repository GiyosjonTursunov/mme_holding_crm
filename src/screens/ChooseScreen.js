import React, {useEffect} from 'react';
import tw from 'twrnc';
import {View, Text, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ChooseScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('@user').then(value => {
      if (!JSON.parse(value)?.token) {
        navigation.navigate('ChooseCompanyScreen');
      } else {
        switch (JSON.parse(value)?.role) {
          case 'DIRECTOR':
            navigation.navigate('MainPageScreen');
            break;

          case 'MANAGER':
            console.log('MANAGER');
            navigation.navigate('CostTypesScreen');
            break;

          case 'VENDOR_MANAGER':
            navigation.navigate('VendorScreen_Manager');
            break;

          case 'SUPPLIER':
            navigation.navigate('SupplierScreen');
            break;

          case 'WAREHOUSE':
            navigation.navigate('OrdersListScreen');
            break;

          case 'SALON':
            navigation.navigate('SalonScreen');
            break;

          case 'ADMIN':
            navigation.navigate('AdminScreen');
            break;

          default:
            // navigation.navigate("RegisterScreen");
            navigation.navigate('ChooseCompanyScreen');
            break;
        }
      }
    });
  }, [navigation]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`m-auto text-8xl`}>MME</Text>
    </View>
  );
};

export default ChooseScreen;
