/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import directorGController from '../../controllers/directorManager/get';

const ListOrderedDresses = () => {
  const navigation = useNavigation();
  const [salonList, setSalonList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    directorGController.getAllSalesForVendor(
      setSalonList,
      setRefreshing,
      'refresh',
    );
  }, []);

  const Item = ({name, date_created, id, del_date, index}) => (
    <View style={tw`flex-row justify-around items-center`}>
      <View
        style={[
          tw`w-12 h-12 rounded-full m-auto`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#F7B699',
          },
        ]}>
        <Text style={tw`m-auto`}>{index + 1}</Text>
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
    />
  );

  return (
    <View style={tw`flex-1 bg-white pt-5`}>
      <View style={tw`w-full h-${Dimensions.get('screen').height / 5.6}`}>
        <FlatList
          data={salonList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              onRefresh={() =>
                directorGController.getAllSalesForVendor(
                  setSalonList,
                  setRefreshing,
                  'refresh',
                )
              }
              refreshing={refreshing}
            />
          }
        />
      </View>
    </View>
  );
};

export default ListOrderedDresses;
