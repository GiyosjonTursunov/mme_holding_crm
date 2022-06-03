/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import DoubleBtn from '../global/DoubleBtn';
import Header from '../global/Header';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';

// refreshControl={
//   <RefreshControl
//     onRefresh={() =>
//       directorGController.getAllSalesForVendor(
//         setSalonList,
//         setRefreshing,
//         'refresh',
//       )
//     }
//     refreshing={refreshing}
//   />
// }

const ListOrderedDresses = () => {
  const navigation = useNavigation();
  const [salonList, setSalonList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {token, role} = useSelector(state => state.userReducer);

  const getOrder = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/warehouse-orders/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSalonList(res.data);
        setRefreshing(false);
        console.error(res.data);
      })
      .catch(_error => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getOrder();
  }, [token]);

  const Item = ({
    name,
    date_created,
    id,
    del_date,
    index,
    status,
    wrManager,
    drManager,
  }) => (
    <View style={tw`flex-row justify-around items-center`}>
      <View style={tw`flex-row ml-2`}>
        <View
          style={[
            tw`w-6 h-12 rounded-tl-full rounded-bl-full m-auto`,
            {
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 2,
              shadowOffset: {
                width: 0.5,
                height: 0.5,
              },
              elevation: 2,
              backgroundColor: !wrManager ? '#ff0000' : '#00ff00',
            },
          ]}
        />

        <View
          style={[
            tw`w-6 h-12 rounded-tr-full rounded-br-full m-auto`,
            {
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 2,
              shadowOffset: {
                width: 0.5,
                height: 0.5,
              },
              elevation: 2,
              backgroundColor: !drManager ? '#ff0000' : '#00ff00',
            },
          ]}>
          <Text
            style={tw`m-auto absolute top-[25%] right-[75%] text-xl text-black`}>
            {index + 1}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('OrdersById', {saleId: id})}
        style={tw`w-9/12 h-18 bg-[#F7F7F7] mx-auto my-1.5 flex-col items-start px-2 rounded-xl border justify-around py-2`}>
        <Text style={tw`text-base`}>
          Salon : <Text style={tw`font-bold`}>{name}</Text>
        </Text>
        <View style={tw`flex-row w-10/12 justify-between`}>
          <Text style={tw`text-[#49CD22] font-bold`}>Sana: {date_created}</Text>
          <Text style={tw`text-red-700 font-bold`}>{del_date || ''}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item, index}) => (
    <Item
      id={item.id}
      name={item?.salon?.name}
      date_created={item?.date_created}
      del_date={item?.delivery_date}
      index={index}
      status={item?.status}
      wrManager={item?.warehouse_manager}
      drManager={item?.decorator_manager}
    />
  );

  return (
    <View
      style={tw`flex-1 bg-white pt-5`}
      refreshControl={
        <RefreshControl onRefresh={getOrder} refreshing={refreshing} />
      }>
      <Header headerName={'Buyurtmalar'} />

      {role === 'DECORATOR_MANAGER' || role === 'DIRECTOR' ? null : (
        <DoubleBtn
          firstBtnName={'Buyurtmalar'}
          firstBtnFunction={() => navigation.navigate('ListOrderedDresses')}
          secondBtnName={'Ombor'}
          secondBtnFunction={() => navigation.navigate('WareHouseScreen')}
        />
      )}

      <View style={tw`w-full h-${Dimensions.get('screen').height / 5.6}`}>
        <FlatList
          data={salonList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl onRefresh={getOrder} refreshing={refreshing} />
          }
        />
      </View>
    </View>
  );
};

export default ListOrderedDresses;
