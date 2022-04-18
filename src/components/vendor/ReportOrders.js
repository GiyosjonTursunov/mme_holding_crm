/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

const ReportOrders = () => {
  const [mainPrice, setMainPrice] = useState();
  const [sum, setSum] = useState();
  const [dollar, setDollar] = useState();
  const [note, setNote] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const getTodaysOrders = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/orders-report-daily/`,
      method: 'GET',
    })
      .then(res => {
        setMainPrice(res.data.main_price);
        setRefreshing(false);
      })
      .catch(() => {
        setMainPrice(0);
        Alert.alert('Ошибка', 'Не удалось получить данные');
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getTodaysOrders();
  }, []);

  const sendReport = () => {
    // {
    //     "id": 3,
    //     "total_price": 14242,
    //     "sum": 120,
    //     "dollar": 45120,
    //     "note": null,
    //     "date_created": "2022-04-18"
    //   }
    const reporData = {
      total_price: mainPrice,
      sum: sum,
      dollar: dollar,
      note: note,
    };

    axios({
      url: `${mainUrl}lastoria/orders-report-daily/`,
      method: 'POST',
      data: reporData,
    })
      .then(() => {
        console.log('Отчет отправлен');
        Alert.alert('Отчет отправлен');
        setSum(0);
        setDollar(0);
        setNote('');
        getTodaysOrders();
      })
      .catch(() => {
        Alert.alert('Ошибка', 'Не удалось отправить отчет');
      });
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getTodaysOrders} />
      }>
      <View style={tw`w-5/12 h-10 mx-auto my-5 border-b`}>
        <Text style={tw`m-auto text-3xl font-semibold`}>
          💰 {mainPrice || 0}
        </Text>
      </View>

      <Text style={tw`mx-auto text-xl`}>Sum 💴</Text>
      <TextInput
        keyboardType="numeric"
        value={sum}
        onChangeText={text => {
          setSum(text);
        }}
        placeholder="Sum 💴"
        style={[
          tw`border w-10/12 h-13 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />

      <Text style={tw`mx-auto text-xl`}>Dollar 💵</Text>
      <TextInput
        keyboardType="numeric"
        value={dollar}
        onChangeText={setDollar}
        placeholder="Dollar 💵"
        style={[
          tw`border w-10/12 h-13 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />

      <TextInput
        value={note}
        multiline
        onChangeText={setNote}
        placeholder="Komentariya 💬"
        style={[
          tw`border w-10/12 h-25 mx-auto my-3 rounded-xl pl-3 border-gray-400`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 0.5,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#fff',
          },
        ]}
      />

      <TouchableOpacity
        onPress={sendReport}
        activeOpacity={0.8}
        style={[
          tw`mx-auto my-3 w-8/12 h-15 rounded-full`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            elevation: 2,
            backgroundColor: '#00aaff',
          },
        ]}>
        <Text style={tw`m-auto text-2xl`}>Yuborish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportOrders;
