import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Input from '../../components/global/Input';
import axios from 'axios';

const {useState} = React;
import {mainUrl} from '../../config/apiUrl';

const LoginScreen = ({route}) => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const sendLogin = () => {
    if (route.params?.key !== 'lastoria') {
      Alert.alert('Bu akkauntga faqat LaStoria hamkorligi ruxsat berilgan!');
    } else {
      const loginData = {
        username: phone,
        password: password,
      };
      let urlLogin = `${mainUrl}auth/login/`;
      axios({
        url: urlLogin,
        method: 'POST',
        data: loginData,
      })
        .then(({data}) => {
          storeData(data);
          console.warn('dataToken', data.token);
          if (data.token) {
            switch (data.role) {
              case 'DIRECTOR':
                navigation.navigate('MainPageScreen');
                // navigation.navigate('AboutWorkScreen');
                break;
              case 'MANAGER':
                navigation.navigate('CostTypesScreen');
                break;

              case 'VENDOR':
                navigation.navigate('VendorScreen');
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
            }
          } else {
            Alert.alert("You don't have permission");
          }
        })
        .catch(_err => {
          console.warn('err =>', _err);
          Alert.alert("You don't have permission");
        });
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@user', jsonValue);
    } catch (e) {
      // saving error
      console.warn(e);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 justify-center relative mt-15`}>
          <Text style={[tw`mx-auto mt-5 text-7xl`]}>MME</Text>
          <Text style={tw`mx-auto text-xs text-[rgba(0,0,0,0.5)] mt-[-3%]`}>
            Holding company
          </Text>
        </View>
        <Text style={[tw`pl-10 mt-10 mb-1 text-[rgba(0,0,0,0.5)] text-lg`]}>
          Phone number
        </Text>
        <Input
          placeH={'phone'}
          value={phone}
          onChangeText={setPhone}
          kboard={'numeric'}
        />
        <Text style={[tw`pl-10 mt-10 mb-1 text-[rgba(0,0,0,0.5)] text-lg`]}>
          Password
        </Text>
        <Input
          placeH={'password'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={tw`w-5/12 h-12 bg-black mx-auto my-4 rounded-2xl`}
          onPress={sendLogin}>
          <Text style={tw`m-auto text-white text-lg font-semibold`}>
            Kirish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mx-auto`}
          onPress={() =>
            navigation.navigate('RegisterScreen', {key: route.params.key})
          }>
          <Text style={tw`text-[#5199FF] font-semibold text-lg`}>
            Akkaunt yaratish
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
