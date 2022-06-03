import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';

import axios from 'axios';

import {mainUrl} from '../../config/apiUrl';
import Header from '../../components/global/Header';
import {useSelector} from 'react-redux';
import ImageZoomCustom from '../../components/modal/ImageZoomCustom';

const OrdersById = ({route}) => {
  const [sale, setSale] = useState([]);
  const [dressImg, setDressImg] = useState([]);

  const [selectedDressImg, setSelectedDressImg] = useState();
  const {token, role} = useSelector(state => state.userReducer);

  const started = () => {
    axios({
      url: `${mainUrl}lastoria/warehouse-orders/${route.params.saleId}/`,
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        Alert.alert('Yangilandi');
        axios({
          url: `${mainUrl}lastoria/warehouse-orders/${route.params.saleId}/`,
          method: 'GET',
          headers: {
            Authorization: `token ${token}`,
          },
        })
          .then(resSale => {
            // console.warn(resSale.data);
            setSale(resSale.data);
            setDressImg([
              resSale.data?.dress?.img1,
              resSale.data?.dress?.img2,
              resSale.data?.dress?.img3,
            ]);
          })
          .catch(_err => {
            const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
            Alert.alert(newLocal);
            // console.log(_err);
          });
      })
      .catch(_error => {
        return;
        // console.log(_error);
      });
  };

  const sended = () => {
    return;
    // console.log('sended function need to realize');
    // axios({
    //   url: `${mainUrl}lastoria/warehouse-order-views/${route.params.saleId}/`,
    //   method: 'POST',
    //   headers: {
    //     Authorization: `token ${token}`,
    //   },
    // })
    //   .then(res => {
    //     Alert.alert('Yangilandi');
    //   })
    //   .catch(_error => {
    //     console.log(_error);
    //   });
  };

  useEffect(() => {
    axios({
      url: `${mainUrl}lastoria/warehouse-orders/${route.params.saleId}/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        // console.warn(res.data);
        setSale(res.data);
        setDressImg([
          res.data.dress.img1,
          res.data.dress.img2,
          res.data.dress.img3,
        ]);
      })
      .catch(_err => {
        const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
        Alert.alert(newLocal);
        // console.log(_err);
      });
  }, [route.params.saleId, token]);

  const [selectedDressImgModalVisible, setSelectedDressImgModalVisible] =
    useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header
        headerName={route.params?.supplier ? 'Yetkazib beruvchi' : 'Sotuvchi'}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={dressImg}
        renderItem={({item}) => (
          <TouchableOpacity
            style={tw`w-60 h-80 mx-1 mb-[${
              Dimensions.get('window').height / 7
            }px]`}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedDressImg(mainUrl + 'media/' + item);
              setSelectedDressImgModalVisible(true);
            }}>
            <Image
              source={{uri: `${mainUrl + 'media/' + item}`}}
              style={tw`w-full h-full rounded-xl`}
              resizeMode="contain"
            />
            <ImageZoomCustom
              selectedDressImgModalVisible={selectedDressImgModalVisible}
              setSelectedDressImgModalVisible={setSelectedDressImgModalVisible}
              selectedDressImg={selectedDressImg}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <ScrollView
        style={tw`w-11/12 bg-white mx-auto`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`border-b w-4/12 ml-4`}>
          <Text style={tw`text-xl mt-2 ml-2 `}>#{route?.params.saleId}</Text>
        </View>
        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Ko`ylak nomi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.dress?.name}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>Shleft</Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.detail?.name}
          </Text>
        </View>

        <View
          style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
          <Text style={tw`text-base font-semibold text-black`}>
            Jo'natilish sanasi
          </Text>
          <Text style={tw`text-base font-semibold text-black`}>
            {sale?.delivery_date}
          </Text>
        </View>

        {role === 'DECORATOR_MANAGER' ? null : (
          <View
            style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
            <Text style={tw`text-base font-semibold text-black`}>
              Telefon raqam
            </Text>
            <Text style={tw`text-base font-semibold text-black`}>
              {sale?.salon?.phone}
            </Text>
          </View>
        )}
        {role === 'DECORATOR_MANAGER' ? null : (
          <View
            style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
            <Text style={tw`text-base font-semibold text-black`}>
              Salon manzili
            </Text>
            <Text style={tw`text-base font-semibold text-black`}>
              {sale?.salon?.address}
            </Text>
          </View>
        )}
        {role === 'DECORATOR_MANAGER' ? null : (
          <View
            style={tw`w-11/12 h-10 border-b border-[rgba(0,0,0,0.3)] mx-auto flex-row justify-between items-end my-[2%]`}>
            <Text style={tw`text-base font-semibold text-black`}>
              Yetkazib berish
            </Text>
            <Text style={tw`text-base font-semibold text-black`}>
              {sale.need_send ? 'SHART' : 'SHART EMAS'}
            </Text>
          </View>
        )}

        <Text style={tw`text-xl mx-auto`}>Komentariya : {sale?.note}</Text>

        {Number(sale?.status) === 1 ? (
          <TouchableOpacity
            onPress={started}
            activeOpacity={0.8}
            style={tw`bg-[#00DC7D] mx-10 rounded-xl h-15 mt-3 mb-5`}>
            <Text style={tw`text-white font-semibold m-auto text-xl`}>
              Qabul qilindi
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={sended}
            activeOpacity={0.8}
            style={tw`bg-blue-500 mx-10 rounded-xl h-15 mt-3 mb-5`}>
            <Text style={tw`text-white font-semibold m-auto text-xl`}>
              Jo'natish
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersById;
