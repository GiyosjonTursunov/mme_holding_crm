/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';

const DailySalesOrders = () => {
  const {token} = useSelector(state => state.userReducer);
  const [simpleSales, setSimpleSales] = useState([]);
  const [saleFifty, setSaleFifty] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [red, setRed] = useState(true);

  useEffect(() => {
    if (red) {
      setRefreshing(true);
      axios({
        method: 'get',
        url: `${mainUrl}lastoria/simple-sales/`,
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(resSimple => {
          setSimpleSales(resSimple.data);
          axios({
            method: 'get',
            url: `${mainUrl}lastoria/sales-5050/`,
            headers: {
              Authorization: `token ${token}`,
            },
          })
            .then(res => {
              setSaleFifty(res.data);
              setRefreshing(false);
              setRed(false);
            })
            .catch(err => {
              console.error(err);
              setRefreshing(false);
              setRed(false);
            });
        })
        .catch(err => {
          console.log(err);
          setRefreshing(false);
          setRed(false);
        });
    }
  }, [token, red]);

  const Item = ({img, dress_name, salon_name, user_name, salonchi_name}) => (
    <View style={tw`mx-3 my-2 border rounded-tl-xl rounded-br-xl px-2`}>
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
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      img={item?.dress?.img1}
      dress_name={item?.dress?.name}
      salon_name={item?.salon?.name}
      salonchi_name={item?.salon?.user}
      user_name={item?.user?.name}
    />
  );

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRed(true)}
        />
      }>
      {simpleSales.length ? (
        <Text style={tw`text-2xl text-black ml-3 mt-3`}>Oddiy sotuvlar</Text>
      ) : (
        <Text style={tw`text-2xl text-black ml-3 mt-3`}>Ma'lumot yo'q</Text>
      )}
      <View style={[tw`w-11/12 ml-3`, {borderWidth: 0.01}]} />
      <FlatList
        data={simpleSales}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
      {saleFifty.length ? (
        <Text style={tw`text-2xl text-black ml-3 mt-5`}>50/50 sotuvlar</Text>
      ) : null}
      <View style={tw`border w-11/12 ml-3 border-[rgba(0,0,0,0.4)]`} />
      <FlatList
        data={saleFifty}
        horizontal
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default DailySalesOrders;
