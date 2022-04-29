/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';

const DebtorsSales = () => {
  const {token, userId} = useSelector(state => state.userReducer);
  const [simpleSales, setSimpleSales] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [salonId, setSalonId] = useState();
  const [saleId, setSaleId] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  const dataSenDebt = {
    given_price: 0,
    user: userId,
    simple_sale: saleId,
    salon: salonId,
  };

  const getData = () => {
    setRefreshing(true);
    axios({
      method: 'get',
      url: `${mainUrl}lastoria/debt-simple-sale-all/`,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSimpleSales(res.data);
        setRefreshing(false);
        console.warn(res.data);
      })
      .catch(err => {
        console.log(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const sendDebt = () => {
    axios({
      url: `${mainUrl}lastoria/simple-sales-history/`,
      data: dataSenDebt,
      method: 'post',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        console.warn(res.data);
        Alert.alert('Успешно', 'Долг успешно отправлен');
        setModalVisible(false);
        getData();
        setSalonId('');
        setSaleId('');
        dataSenDebt.given_price = 0;
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Ошибка', 'Долг не отправлен');
      });
  };

  const Item = ({
    img,
    dress_name,
    salon_name,
    user_name,
    salonchi_name,
    givenPrice,
    leftPrice,
    delivery_date,
    salon_id,
    item,
  }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        setSalonId(salon_id);
        setSaleId(item.id);
        setModalVisible(true);
      }}
      style={tw`mx-3 my-2 border rounded-tl-xl rounded-br-xl px-2`}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)]`}>
          <View style={tw`w-10/12 h-50 m-auto bg-white rounded-xl`}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={require('../../../assets/x-button.png')}
                style={tw`w-8 h-8 absolute right-[-2%] top-[-15px]`}
              />
            </TouchableOpacity>
            <View style={tw`w-10/12 mx-auto`}>
              <Text style={tw`text-xl mt-2`}>Berilgan pul</Text>
              <TextInput
                placeholder="Berilgan"
                onChangeText={text => (dataSenDebt.given_price = Number(text))}
                style={tw`h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-3 mt-2`}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (Number(leftPrice) - Number(dataSenDebt.given_price) < 0) {
                  Alert.alert('Ошибка', 'Недостаточно средств');
                  console.log(
                    Number(leftPrice) - Number(dataSenDebt.given_price),
                  );
                } else {
                  sendDebt();
                }
              }}
              style={tw`m-auto w-6/12 h-15 rounded-2xl bg-black`}>
              <Text style={tw`text-white m-auto text-xl`}>Saqlash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image
        source={{uri: mainUrl + 'media/' + img}}
        style={tw`w-45 h-40 m-auto`}
        resizeMode="contain"
      />
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Ko'ylak : </Text>
        <Text style={tw`text-lg`}>{dress_name}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Salon : </Text>
        <Text style={tw`text-lg`}>{salon_name}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Salonchi : </Text>
        <Text style={tw`text-lg`}>{salonchi_name}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Sotuvchi : </Text>
        <Text style={tw`text-lg`}>{user_name}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Berilgan pul : </Text>
        <Text style={tw`text-lg`}>{givenPrice}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Qarz : </Text>
        <Text style={tw`text-lg`}>{leftPrice}</Text>
      </View>
      <View style={tw`flex-row my-1 items-center`}>
        <Text>Pul berish sanasi : </Text>
        <Text style={tw`text-lg`}>{delivery_date}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      img={item?.dress?.img1}
      dress_name={item?.dress?.name}
      salon_name={item?.salon?.name}
      salonchi_name={item?.salon?.user}
      user_name={item?.user?.name}
      givenPrice={item?.given_price}
      leftPrice={item?.left_price}
      delivery_date={item?.delivery_date}
      salon_id={item?.salon?.id}
      item={item}
    />
  );
  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getData} />
      }>
      <FlatList
        data={simpleSales}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default DebtorsSales;
