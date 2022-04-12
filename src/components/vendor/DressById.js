import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';
import Header from '../global/Header';
import axios from 'axios';

const {useState, useEffect} = React;
import {mainUrl} from '../../config/apiUrl';

const DressById = ({route}) => {
  const [dress, setDress] = useState([]);

  const delivered = () => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/need-send/${Number(route.params.saleId)}/`,
          method: 'POST',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            Alert.alert('Yangilandi');
          })
          .catch(_error => {
            console.log(_error);
          });
      })
      .catch(_err => {
        console.log(_err);
        Alert.alert('Xatolik');
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/sale/${route.params.saleId}`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            setDress(res.data);
          })
          .catch(_err => {
            const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
            Alert.alert(newLocal);
            console.log(_err);
          });
      })
      .catch(_err => {
        const newLocal = 'Akkaunt yoq.';
        Alert.alert(newLocal);
        console.log(_err);
      });
  }, [route.params.saleId]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header
        headerName={route.params?.supplier ? 'Yetkazib beruvchi' : 'Sotuvchi'}
      />
      <View style={tw`w-10/12 h-50 mx-auto`}>
        {dress.dress?.img ? (
          <Image
            source={{uri: `${mainUrl + dress.dress.img.substring(1)}`}}
            style={tw`w-full h-full rounded-xl`}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require('../../../assets/wedding-dress.png')}
            style={tw`w-full h-full rounded-xl`}
            resizeMode="contain"
          />
        )}
      </View>
      <ScrollView
        style={tw`w-11/12 bg-white mx-auto`}
        showsVerticalScrollIndicator={false}>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Ko`ylak nomi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.dress?.name}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Ko`ylak narxi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.dress?.price}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Berilgan summa
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.given_price ? dress?.given_price : dress?.salon_given_price}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Qolgan summa
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.left_price}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Jo'natilish sanasi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.delivery_date}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>Salon nomi</Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.salon?.salon_name}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Telefon raqam
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.salon?.user}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Salon manzili
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress?.salon?.address}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Yetkazib berish
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {dress.need_send ? 'SHART' : 'SHART EMAS'}
          </Text>
        </View>

        {route.params?.director || route.params?.type ? null : (
          <View style={tw`flex-row mx-auto my-5`}>
            <TouchableOpacity
              onPress={() => console.log('koylak yetib borishi bekor qilinsin')}
              activeOpacity={0.8}
              style={tw`px-5 py-3 bg-[#EE3D48] mx-3 rounded-xl`}>
              <Text style={tw`text-white font-semibold`}>Bekor qilish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={delivered}
              activeOpacity={0.8}
              style={tw`px-5 py-3 bg-[#00DC7D] mx-3 rounded-xl`}>
              <Text style={tw`text-white font-semibold`}>Yetkazib berildi</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DressById;
