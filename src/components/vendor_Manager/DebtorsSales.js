import {ScrollView, Text, View, Image, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {mainUrl} from '../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';

const DebtorsSales = () => {
  const {token} = useSelector(state => state.userReducer);

  const [simpleSales, setSimpleSales] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${mainUrl}lastoria/debt-all/`,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        setSimpleSales(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);

  const Item = ({
    img,
    dress_name,
    salon_name,
    user_name,
    salonchi_name,
    item,
    givenPrice,
    leftPrice,
    delivery_date,
  }) => (
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
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      img={item?.dress?.img1}
      dress_name={item?.dress?.name}
      salon_name={item?.salon?.name}
      salonchi_name={item?.salon?.user}
      user_name={item?.user?.name}
      item={item}
      givenPrice={item?.given_price}
      leftPrice={item?.left_price}
      delivery_date={item?.delivery_date}
    />
  );
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
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
