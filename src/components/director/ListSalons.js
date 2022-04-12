import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const ListSalons = ({dataList}) => {
  const navigation = useNavigation();
  // console.log('ListSalons dataList', dataList);

  const ItemSalon = ({salon_name, salon_address, salon_id}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AboutSalonScreen', {
          name: salon_name,
          id: salon_id,
        })
      }
      style={[
        tw`w-90 h-20 mx-auto mt-[2%] flex-row justify-center items-center rounded-xl bg-white my-2 mx-4`,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          shadowColor: '#000',
          shadowOpacity: 0.17,
          shadowRadius: 5,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 4,
        },
      ]}>
      <Image
        source={require('../../../assets/magazin1.png')}
        style={tw`w-15 h-15 rounded-xl m-auto`}
      />

      <View style={tw`w-7/12 h-full pl-3 justify-around`}>
        <Text style={tw`text-lg font-bold`}>{salon_name}</Text>
        <View style={tw`flex-row w-12/12 justify-around`}>
          <Text style={tw`text-[#49CD22] text-base`}>Manzil</Text>
          <Text style={tw`text-[#FFC029] text-base`}>{salon_address}</Text>
        </View>
      </View>

      <Image
        source={require('../../../assets/arrow-right.png')}
        style={tw`w-8 h-8 mr-[5%]`}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderItemSalon = ({item}) => (
    <ItemSalon
      salon_name={item.salon_name}
      salon_address={item.address}
      salon_id={item.id}
    />
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      pagingEnabled
      data={dataList}
      renderItem={renderItemSalon}
      keyExtractor={item => item.id}
      
    />
  );
};

export default ListSalons;
