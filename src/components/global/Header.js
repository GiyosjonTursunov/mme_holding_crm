import React from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';

const {useState, useEffect} = React;
import {useNavigation} from '@react-navigation/native';

const Header = ({headerName, isRegister}) => {
  const navigation = useNavigation();
  const [user_data, setUser_data] = useState();

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue) {
        let parsedJson = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (!parsedJson.token) {
          AsyncStorage.removeItem('@user')
            .then(() => {
              navigation.navigate('ChooseCompanyScreen');
            })
            .catch(_err => {
              console.warn('error remove item', _err);
              navigation.navigate('ChooseCompanyScreen');
            });
        } else if (parsedJson.token) {
          setUser_data(parsedJson);
        }
      } else {
        console.warn('invalid user =>', jsonValue);
      }
    };
    getData();
  }, [navigation]);

  const ExitAccount = () => {
    if (isRegister) {
      Alert.alert('Sozlamalar', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Akkaunt qo`shish',
          onPress: async () => {
            navigation.navigate('RegisterResidenceScreen');
          },
        },
        {
          text: 'Chiqish',
          onPress: async () => {
            AsyncStorage.removeItem('@user')
              .then(() => {
                navigation.navigate('ChooseCompanyScreen');
              })
              .catch(_err => {
                console.error('ERROR!', _err);
              });
            console.log('Logged out!');
          },
          style: 'destructive',
        },
      ]);
    } else {
      Alert.alert('Sozlamalar', '', [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Chiqish',
          onPress: async () => {
            AsyncStorage.removeItem('@user')
              .then(() => {
                navigation.navigate('ChooseCompanyScreen');
              })
              .catch(err => {
                console.error('ERROR!', err);
              });
            console.log('Logged out!');
          },
          style: 'destructive',
        },
      ]);
    }
  };

  return (
    <View style={tw`w-full justify-between items-center flex-row px-5 my-1`}>
      <Text style={tw`text-base text-black font-semibold min-w-3/12 my-auto`}>
        {headerName}
      </Text>
      <Text style={tw`text-lg text-black font-bold`}>{user_data?.name}</Text>
      <View style={tw`flex-row`}>
        <TouchableOpacity activeOpacity={0.7} onPress={ExitAccount}>
          <Image
            source={require('../../../assets/profile-user.png')}
            style={tw`w-10 h-10`}
            onPress={ExitAccount}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
