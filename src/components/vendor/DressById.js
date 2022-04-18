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
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import Header from '../global/Header';
import axios from 'axios';

const {useState, useEffect} = React;
import {baseUrl, mainUrl} from '../../config/apiUrl';

const DressById = ({route}) => {
  const [sale, setSale] = useState([]);
  const [dressImg, setDressImg] = useState([]);

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
          url: `${mainUrl}lastoria/orders/${route.params.saleId}`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            setSale(res.data);
            setDressImg([
              res.data.dress.img1,
              res.data.dress.img2,
              res.data.dress.img3,
              res.data.dress.img4,
            ]);
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
      <FlatList
        horizontal
        data={dressImg}
        renderItem={({item, index}) => (
          <View style={tw`w-40 h-50 mx-auto`}>
            <Image
              source={{uri: `${baseUrl + item}`}}
              style={tw`w-full h-full rounded-xl`}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ScrollView
        style={tw`w-11/12 bg-white mx-auto`}
        showsVerticalScrollIndicator={false}>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Ko`ylak nomi {route.params.saleId}
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.dress?.name}
          </Text>
        </View>

        {route.params?.supplier ? null : (
          <>
            <View
              style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
              <Text style={tw`text-base font-semibold text-black`}>
                Ko`ylak narxi
              </Text>
              <Text style={tw`text-base font-semibold text-black`}>
                {sale?.dress?.price}
              </Text>
            </View>

            <View
              style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
              <Text style={tw`text-base font-semibold text-black`}>
                Berilgan summa
              </Text>
              <Text style={tw`text-base font-semibold text-black`}>
                {sale?.given_price
                  ? sale?.given_price
                  : sale?.salon_given_price}
              </Text>
            </View>

            <View
              style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
              <Text style={tw`text-base font-semibold text-black`}>
                Qolgan summa
              </Text>
              <Text style={tw`text-base font-semibold text-black`}>
                {sale?.left_price}
              </Text>
            </View>
          </>
        )}

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Jo'natilish sanasi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.delivery_date}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>Salon nomi</Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.salon_name}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Telefon raqam
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.user}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Salon manzili
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.salon?.address}
          </Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Yetkazib berish
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale.need_send ? 'SHART' : 'SHART EMAS'}
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
