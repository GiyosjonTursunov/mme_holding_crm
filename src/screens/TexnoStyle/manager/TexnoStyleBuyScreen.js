import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {useSelector} from 'react-redux';

import {baseUrl, mainUrl} from '../../../config/apiUrl';
import ListDoors from '../modals/ListDoors';
import axios from 'axios';

const TexnoStyleBuyScreen = () => {
  const [uriImage, setUriImage] = useState('');

  const {token} = useSelector(state => state.userReducer);

  const [doorId, setDoorId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');

  const createDoor = async () => {
    let url = `${mainUrl}texno-style/doors-append-history/`;
    let dataBuyDoor = {
      price: price,
      count: count,
      doors: doorId,
    };

    if (name && Number(price) && Number(count) && doorId) {
      axios({
        url: url,
        method: 'POST',
        data: dataBuyDoor,
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(res => {
          Alert.alert('Успешно', 'Добавлено');
          setName('');
          setPrice('');
          setCount('');
          setDoorId('');
        })
        .catch(er => {
          console.error(er);
        });
    }
  };

  return (
    <ScrollView style={tw`bg-white pt-3`}>
      <ListDoors
        setDoorId={setDoorId}
        setName={setName}
        setDoorPrice={setPrice}
        setDoorImg={setUriImage}
      />
      <TextInput
        placeholder={name || 'Eshik nomi'}
        style={tw`border w-11/12 h-13 mx-auto my-2 rounded-xl pl-5g border-gray-500`}
        onChangeText={setName}
      />

      <TextInput
        placeholder={String(price) || 'Eshik narxi'}
        style={tw`border w-11/12 h-13 mx-auto my-2 rounded-xl pl-5 border-gray-500`}
        onChangeText={setPrice}
      />

      <TextInput
        placeholder="Eshik soni"
        style={tw`border w-11/12 h-13 my-2 rounded-xl pl-5 border-gray-500 mx-auto`}
        onChangeText={setCount}
      />

      {uriImage ? (
        <Image
          source={{uri: baseUrl + uriImage}}
          style={tw`w-full h-75 my-2`}
          resizeMode="contain"
        />
      ) : null}

      <TouchableOpacity
        onPress={createDoor}
        style={tw`w-8/12 h-15 bg-[#323054] my-2 mx-auto rounded-xl`}>
        <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TexnoStyleBuyScreen;
