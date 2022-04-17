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

  const Item = ({name, given_price, salon_given_price, date_created, id}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrdersById', {saleId: id})}
      style={tw`w-11/12 h-18 bg-[#F7F7F7] mx-auto my-1.5 flex-col items-start px-2 rounded-xl border justify-around py-2`}>
      <Text style={tw`text-base`}>
        Salon nomi: <Text style={tw`font-bold`}>{name}</Text>
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
      name={item?.salon}
      given_price={item?.given_price}
      salon_given_price={item?.salon_given_price}
      date_created={item?.date_created}
    />
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View
        style={tw`flex-row border-b mx-auto justify-start w-10/12 justify-between my-2 items-center`}>
        <Text style={tw`text-lg font-bold mr-3`}>Buyurtmalar</Text>
      </View>
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
