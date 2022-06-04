import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';

import axios from 'axios';

import {mainUrl} from '../../config/apiUrl';
import Header from '../../components/global/Header';
import {useSelector} from 'react-redux';
import ImageZoomCustom from '../../components/modal/ImageZoomCustom';

const OrdersById = ({route}) => {
  const [sale, setSale] = useState([]);
  // const [dressImg, setDressImg] = useState([]);

  const [selectedDressImg, setSelectedDressImg] = useState();
  const {token, role} = useSelector(state => state.userReducer);

  const [refreshing, setRefreshing] = useState(false);

  // const [dressZoomImg, setDressZoomImg] = useState(false);

  const [selectedDressImgModalVisible, setSelectedDressImgModalVisible] =
    useState(false);

  const started = () => {
    setRefreshing(true);
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
            setRefreshing(false);
            setSale(resSale.data);
            // setDressImg(resSale.data?.dress?.img);
          })
          .catch(_err => {
            const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
            Alert.alert(newLocal);
            setRefreshing(false);
            // console.log(_err);
          });
      })
      .catch(_error => {
        setRefreshing(false);
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
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/warehouse-orders/${route.params.saleId}/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSale(res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
        Alert.alert(newLocal);
        // console.log(_err);
        setRefreshing(false);
      });
  }, [route.params.saleId, token]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header
        headerName={route.params?.supplier ? 'Yetkazib beruvchi' : 'Sotuvchi'}
      />
      <ScrollView
        style={tw`w-11/12 bg-white mx-auto`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              axios({
                url: `${mainUrl}lastoria/warehouse-orders/${route.params.saleId}/`,
                method: 'GET',
                headers: {
                  Authorization: `token ${token}`,
                },
              })
                .then(res => {
                  setSale(res.data);
                  setRefreshing(false);
                })
                .catch(_err => {
                  const newLocal = 'Bazaga ulanishda xatolik yuz berdi!';
                  Alert.alert(newLocal);
                  // console.log(_err);
                  setRefreshing(false);
                });
            }}
            colors={['#6c63ff', '#6c63ff']}
            tintColor="#6c63ff"
            title="Yangilash"
            titleColor="#6c63ff"
          />
        }>
        {sale?.dress?.img ? (
          <TouchableOpacity
            style={tw`w-full h-100 mx-auto`}
            activeOpacity={0.8}
            onPress={() => {
              console.warn(mainUrl + 'media/' + sale?.dress?.img);
              setSelectedDressImg(mainUrl + 'media/' + sale?.dress?.img);
              setSelectedDressImgModalVisible(true);
            }}>
            <Image
              source={{uri: `${mainUrl + 'media/' + sale?.dress?.img}`}}
              style={tw`w-full h-full`}
              resizeMode="contain"
            />
            <ImageZoomCustom
              selectedDressImgModalVisible={selectedDressImgModalVisible}
              setSelectedDressImgModalVisible={setSelectedDressImgModalVisible}
              selectedDressImg={selectedDressImg}
            />
          </TouchableOpacity>
        ) : null}

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
          sale.decorator_manager && role === 'DECORATOR_MANAGER' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`bg-[#000] mx-10 rounded-xl h-15 mt-3 mb-5 flex-col`}>
              <Text style={tw`text-white font-semibold m-auto text-xl`}>
                Qabul qildingiz
              </Text>
              <Text style={tw`text-white m-auto`}>Omborchi kutilmoqda</Text>
            </TouchableOpacity>
          ) : sale.warehouse_manager && role === 'WAREHOUSE_MANAGER' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={tw`bg-[#00DC7D] mx-10 rounded-xl h-15 mt-3 mb-5 flex-col`}>
              <Text style={tw`text-white font-semibold m-auto text-xl`}>
                Qabul qildingiz
              </Text>
              <Text style={tw`text-white m-auto`}>Dekoratorchi kutilmoqda</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={started}
              activeOpacity={0.8}
              style={tw`bg-[#00DC7D] mx-10 rounded-xl h-15 mt-3 mb-5`}>
              <Text style={tw`text-white font-semibold m-auto text-xl`}>
                Qabul qilish
              </Text>
            </TouchableOpacity>
          )
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
