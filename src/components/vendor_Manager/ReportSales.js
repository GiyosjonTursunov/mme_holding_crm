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
import {useSelector} from 'react-redux';

const ReportSales = () => {
  const {userId, token, magazineId} = useSelector(state => state.userReducer);
  const [mainPrice, setMainPrice] = useState();
  const [givenPrice, setGivenPrice] = useState();
  const [leftPrice, setLeftPrice] = useState();
  const [salonGivenPrice, setSalonGivenPrice] = useState();

  const [sum, setSum] = useState();
  const [dollar, setDollar] = useState();
  const [note, setNote] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const getTodaysSales = () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}lastoria/all-sales-daily-reports/`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(res => {
        console.warn(res.data);
        setMainPrice(res.data.main_price);
        setGivenPrice(res.data.given_price);
        setLeftPrice(res.data.left_price);
        setSalonGivenPrice(res.data.salon_given_price);
        setRefreshing(false);
      })
      .catch(err => {
        setMainPrice(0);
        Alert.alert('Ошибка', 'Не удалось получить данные');
        setRefreshing(false);
        console.error(err);
      });
  };

  useEffect(() => {
    getTodaysSales();
  }, []);

  const sendReport = () => {
    const reporData = {
      salon_given_price: salonGivenPrice,
      total_price: mainPrice,
      left_price: leftPrice,
      given_price: givenPrice,
      sum: sum,
      dollar: dollar,
      note: note,
    };

    axios({
      url: `${mainUrl}lastoria/all-sales-daily-reports/`,
      method: 'POST',
      data: reporData,
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then(() => {
        setSum(0);
        setDollar(0);
        setNote('');
        getTodaysSales();
        Alert.alert('Отчет отправлен');
      })
      .catch(() => {
        Alert.alert('Ошибка', 'Не удалось отправить отчет');
      });
  };

  return (
    <ScrollView
      style={tw`flex-1 bg-white`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getTodaysSales} />
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

export default ReportSales;
