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
  Modal,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import Header from '../global/Header';
import axios from 'axios';
import ImageZoom from 'react-native-image-pan-zoom';

const {useState, useEffect} = React;
import {baseUrl, mainUrl} from '../../config/apiUrl';

const OrdersById = ({route}) => {
  const [sale, setSale] = useState([]);
  const [dressImg, setDressImg] = useState([]);

  const [selectedDressImg, setSelectedDressImg] = useState([]);

  const started = () => {
    console.warn('change status to Started');
    // AsyncStorage.getItem('@user')
    //   .then(stringJson => {
    //     axios({
    //       url: `${mainUrl}lastoria/need-send/${Number(route.params.saleId)}/`,
    //       method: 'POST',
    //       headers: {
    //         Authorization: `token ${JSON.parse(stringJson).token}`,
    //       },
    //     })
    //       .then(res => {
    //         Alert.alert('Yangilandi');
    //       })
    //       .catch(_error => {
    //         console.log(_error);
    //       });
    //   })
    //   .catch(_err => {
    //     console.log(_err);
    //     Alert.alert('Xatolik');
    //   });
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
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        data={dressImg}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={tw`w-60 h-80 mx-auto mb-[${
              Dimensions.get('window').height / 7
            }px]`}
            activeOpacity={0.8}
            onPress={() => setSelectedDressImg(baseUrl + item)}>
            <Image
              source={{uri: `${baseUrl + item}`}}
              style={tw`w-full h-full rounded-xl`}
              resizeMode="contain"
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={selectedDressImg === baseUrl + item}
              onRequestClose={() => {
                setSelectedDressImg(false);
              }}>
              <View style={tw`flex-1 bg-white`}>
                <ImageZoom
                  cropWidth={Dimensions.get('window').width}
                  cropHeight={Dimensions.get('window').height}
                  imageWidth={Dimensions.get('window').width}
                  imageHeight={Dimensions.get('window').height}>
                  <Image
                    source={{uri: `${baseUrl + item}`}}
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                  />
                </ImageZoom>
                <TouchableOpacity
                  style={tw`absolute top-0 left-0 mt-10 ml-5`}
                  onPress={() => {
                    setSelectedDressImg(false);
                  }}>
                  <Image
                    source={require('../../../assets/back.png')}
                    style={tw`w-10 h-10`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </Modal>
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
            {sale?.dress_detail?.name}
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
          <TouchableOpacity
            onPress={started}
            activeOpacity={0.8}
            style={tw`bg-[#00DC7D] mx-10 rounded-xl h-15 mt-3`}>
            <Text style={tw`text-white font-semibold m-auto text-xl`}>
              Qabul qilindi
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersById;
