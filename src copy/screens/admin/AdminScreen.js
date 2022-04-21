import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/global/Header';

const AdminScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'AdminPanel'} />
      <View style={tw`flex-row justify-around`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterResidenceScreen')}
          activeOpacity={0.7}
          style={[
            tw`w-5/12 h-40 rounded-3xl bg-[#DDFFDA]`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              shadowColor: '#000',
              shadowOpacity: 0.17,
              shadowRadius: 5,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 3,
            },
          ]}>
          <Text
            style={tw`font-semibold text-2xl m-auto text-center text-black`}>
            Ro'yxatdan o'tkazish
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterResidenceScreen')}
          activeOpacity={0.7}
          style={[
            tw`w-5/12 h-40 rounded-3xl bg-[#DDFFDA]`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              shadowColor: '#000',
              shadowOpacity: 0.17,
              shadowRadius: 5,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              elevation: 3,
            },
          ]}>
          <Text
            style={tw`font-semibold text-2xl m-auto text-center text-black`}>
            Login Director sifatida
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;
