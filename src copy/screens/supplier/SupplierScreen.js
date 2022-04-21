import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

const SupplierScreen = () => {
  const navigation = useNavigation();
  const [salonList, setSalonList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllSales = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/need-send/`,
    })
      .then(res => {
        console.warn('resSaleAll  =>', res.data);
        setSalonList(res.data);
        setRefreshing(false);
      })
      .catch(err => {
        console.warn(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getAllSales();
  }, []);

  const Item = ({
    name,
    given_price,
    salon_given_price,
    date_created,
    id,
    dressId,
  }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DressById', {
          dressId: dressId,
          saleId: id,
          supplier: true,
        })
      }
      style={tw`w-11/12 h-18 bg-[#F7F7F7] mx-auto my-1.5 flex-col items-start px-2 rounded-xl border justify-around py-2`}>
      <Text style={tw`text-base text-black`}>
        Salon nomi: {'   '}
        <Text style={tw`font-bold`}>{name}</Text>
      </Text>
      <View style={tw`flex-row w-10/12 justify-between`}>
        <Text style={tw`text-[#49CD22] font-bold`}>
          Berilgan summa: {given_price ? given_price : salon_given_price}
        </Text>
        <Text style={tw`text-[#FFC029] font-bold`}>Sana: {date_created}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      id={item.id}
      name={item.salon}
      given_price={item.given_price}
      salon_given_price={item.salon_given_price}
      date_created={item.date_created}
      dressId={item?.dress_id}
    />
  );
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Header headerName={'Yetkazib beruvchi'} />
      <FlatList
        data={salonList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl onRefresh={getAllSales} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default SupplierScreen;
