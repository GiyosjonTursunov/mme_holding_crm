import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';

import LottieView from 'lottie-react-native';

const VendorScreen = () => {
  const {token} = useSelector(state => state.userReducer);

  const [orders, setOrders] = useState([]);
  const [saleFifty, setSaleFifty] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [red, setRed] = useState(true);

  useEffect(() => {
    if (red) {
      setRefreshing(true);
      // console.warn(token);
      axios({
        url: `${mainUrl}lastoria/user-orders-daily/`,
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(res => {
          // console.error('kunlik zakaz sotuvchi => ', res.data);
          setOrders(res.data);
          axios({
            url: `${mainUrl}lastoria/user-sales-5050/`,
            method: 'GET',
            headers: {
              Authorization: `token ${token}`,
            },
          })
            .then(resFifty => {
              setSaleFifty(resFifty.data);
              setRefreshing(false);
              setRed(false);
              // console.warn(resFifty.data);
            })
            .catch(_err => {
              // console.log(err);
              setRefreshing(false);
              setRed(false);
            });
        })
        .catch(_err => {
          return;
          // console.log(err);
        });
    }
  }, [red, token]);

  const Item = ({img, dress_name, salon_name, user_name, salonchi_name}) => (
    <View
      style={tw`w-[${Dimensions.get('screen').width / 1.35}px] h-45 ml-[${
        Dimensions.get('screen').width / 6.5
      }px] mt-[${
        Dimensions.get('screen').width / 14
      }px] bg-[#468CE4] rounded-3xl`}>
      <Image
        source={{uri: mainUrl + 'media/' + img}}
        style={tw`w-[${
          Dimensions.get('screen').width / 3.3
        }px] h-45 absolute top-[-${
          Dimensions.get('screen').height / 40
        }px] left-[-${Dimensions.get('screen').width / 9}px] rounded-3xl`}
        resizeMode="cover"
      />
      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px] w-9/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
        <Text style={tw`text-white text-lg`}>Ko'ylak : </Text>
        <Text style={tw`text-lg text-white`}>{dress_name}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 20
        }px] w-6/12 h-[${Dimensions.get('screen').height / 25}px] self-end`}>
        <Text style={tw`text-white text-lg`}>Salon : </Text>
        <Text style={tw`text-lg text-white`}>{salon_name}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px] w-/12 self-end`}>
        <Text style={tw`text-white text-lg`}>Salonchi : </Text>
        <Text style={tw`text-lg text-white`}>{salonchi_name}</Text>
      </View>

      <View
        style={tw`flex-row my-1 items-center justify-end pr-[${
          Dimensions.get('screen').width / 15
        }px]`}>
        <Text style={tw`text-white text-lg`}>Sotuvchi : </Text>
        <Text style={tw`text-lg text-white`}>{user_name}</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      img={item?.dress?.img}
      dress_name={item?.dress?.name}
      salon_name={item?.salon?.name}
      salonchi_name={item?.salon?.user}
      user_name={item?.user?.name}
    />
  );

  const mapData = () => {
    return (
      <>
        {saleFifty.length ? (
          <>
            <Text style={tw`text-2xl text-black ml-3 mt-5`}>
              50/50 sotuvlar
            </Text>
            <View style={tw`border w-11/12 ml-3 border-[rgba(0,0,0,0.4)]`} />
          </>
        ) : null}
        <FlatList
          data={saleFifty}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {orders.length ? (
          <>
            <Text style={tw`text-2xl text-black ml-3 mt-5`}>Buyurtmalar</Text>
            <View style={tw`border w-11/12 ml-3 border-[rgba(0,0,0,0.4)]`} />
          </>
        ) : null}
        <FlatList
          data={orders}
          horizontal
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1 bg-white`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRed(true)}
          />
        }>
        {!saleFifty.length && !orders.length ? (
          <LottieView
            source={require('../../../assets/lottie/search.json')}
            style={tw`w-full m-auto`}
            autoPlay
            loop
          />
        ) : (
          mapData()
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorScreen;
