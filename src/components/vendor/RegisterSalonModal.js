import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

const RegisterSalonModal = () => {
  // salonchi register uchun hooklar
  const [salonchiName, setSalonchiName] = useState('');
  const [salonName, setSalonName] = useState('');
  const [salonPhone, setSalonPhone] = useState('');
  const [salonAddress, setSalonAddress] = useState('');

  const [passwordSalon, setPasswordSalon] = useState('');

  const createSalon = () => {
    if (
      salonchiName &&
      salonName &&
      Number(salonPhone) &&
      salonAddress &&
      passwordSalon
    ) {
      let dataSalon = {
        password: passwordSalon,
        name: salonchiName,
        username: salonPhone,
        salon_name: salonName,
        address: salonAddress,
      };

      AsyncStorage.getItem('@user')
        .then(stringJson => {
          axios({
            url: `${mainUrl}lastoria/salon/`,
            method: 'POST',
            data: dataSalon,
            headers: {
              Authorization: `token ${JSON.parse(stringJson).token}`,
            },
          })
            .then(res => {
              Alert.alert('Qo`shildi');
              setPasswordSalon('');
              setSalonchiName('');
              setSalonPhone('');
              setSalonName('');
              setSalonAddress('');
            })
            .catch(err => {
              Alert.alert('Baza bilan qandaydir hatolik.');
              console.warn('err createSalon => ', err);
            });
        })
        .catch(_err => {
          console.log(_err);
          Alert.alert('Xatolik');
        });
    } else {
      Alert.alert('To`liq yozilmagan');
    }
  };

  return (
    <View style={tw`w-11/12 h-95 rounded-2xl m-auto justify-around`}>
      <TextInput
        value={salonName}
        onChangeText={setSalonName}
        placeholder="Salon nomi"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonchiName}
        onChangeText={setSalonchiName}
        placeholder="Salon egasi ismi"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonPhone}
        onChangeText={setSalonPhone}
        placeholder="Telefon raqam"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={salonAddress}
        onChangeText={setSalonAddress}
        placeholder="Manzil"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TextInput
        value={passwordSalon}
        onChangeText={setPasswordSalon}
        placeholder="Password"
        placeholderTextColor="#7F7F7F"
        style={tw`border h-10 rounded-2xl px-2 border-[rgba(0,0,0,0.5)]`}
      />
      <TouchableOpacity
        onPress={createSalon}
        style={tw`w-6.5/12 h-11 border mx-auto rounded-full bg-black`}>
        <Text style={tw`m-auto text-white font-semibold text-base`}>
          Saqlash
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterSalonModal;
