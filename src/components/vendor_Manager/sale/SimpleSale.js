import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import RegisterDress from '../modals/RegisterDress';
import RegisterSalon from '../modals/RegisterSalon';
import DatePickerCustom from '../../global/DatePickerCustom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';

const SimpleSale = () => {
  const [dressId, setDressId] = useState();
  const [colorId, setColorId] = useState();
  const [selectedShleftId, setSelectedShleftId] = useState();
  const [mainPrice, setMainPrice] = useState('');
  const [givenPrice, setGivenPrice] = useState();
  const [leftPrice, setLeftPrice] = useState();
  const [moneyGiveDate, setMoneyGiveDate] = useState();
  const [salonId, setSalonId] = useState();
  const [note, setNote] = useState();
  // delievery_date
  const {userId, token, magazineId} = useSelector(state => state.userReducer);

  const [selectedShleftName, setSelectedShleftName] = useState();

  const dataForSimpleSale = {
    dress: dressId,
    color: colorId,
    detail: selectedShleftId,
    main_price: mainPrice,
    given_price: givenPrice,
    left_price: leftPrice,
    salon: salonId,
    user: userId,
    date_left_price: moneyGiveDate,
    magazine_id: magazineId,
  };

  const sendSimpleSale = () => {
    console.warn('dataForSimpleSale =>', dataForSimpleSale);
    if (dressId && givenPrice >= 0 && salonId && magazineId) {
      axios({
        url: `${mainUrl}lastoria/simple-sales/`,
        method: 'POST',
        data: dataForSimpleSale,
        headers: {
          Authorization: 'token ' + token,
        },
      })
        .then(res => {
          Alert.alert('Продажа успешно добавлена');
          setDressId('');
          setColorId('');
          setSelectedShleftId('');
          setMainPrice('');
          setGivenPrice('');
          setLeftPrice('');
          setMoneyGiveDate('');
          setSalonId('');
          setNote('');
        })
        .catch(err => {
          console.error(err);
          Alert.alert('Error');
        });
    } else {
      console.warn(dressId, givenPrice, salonId, magazineId);
      Alert.alert('Заполните все поля');
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`mt-[3%]`}>
        <RegisterDress
          setDressId={setDressId}
          setMainPriceSale={setMainPrice}
          setColorId={setColorId}
          setSelectedShleftId={setSelectedShleftId}
          setSelectedShleftName={setSelectedShleftName}
        />
      </View>
      <TextInput
        placeholder={String(mainPrice) || 'Narx'}
        defaultValue={mainPrice}
        onChangeText={text => {
          if (givenPrice && text - givenPrice >= 0) {
            setMainPrice(text);
            setLeftPrice(text - givenPrice);
          } else if (!givenPrice) {
            setMainPrice(text);
          }
        }}
        style={tw`w-11/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center mx-auto`}
        keyboardType="numeric"
      />
      <RegisterSalon setSalonId={setSalonId} />

      <View style={tw`w-11/12 flex-row mx-auto my-[1%] justify-between`}>
        <TextInput
          placeholder="Berilgan"
          value={givenPrice}
          onChangeText={text => {
            if (mainPrice && mainPrice - text >= 0) {
              setGivenPrice(text);
              setLeftPrice(mainPrice - text);
            }
          }}
          style={tw`w-6/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-3`}
          keyboardType="numeric"
        />

        <View style={tw`w-4/12 justify-center items-center`}>
          <Text>Qoldi</Text>
          <Text style={tw`text-lg`}>{leftPrice}</Text>
        </View>
      </View>

      <View
        style={tw`w-11/12 flex-row justify-between items-center mx-auto my-[1%]`}>
        <Text style={tw`text-lg`}>Pul berilish sanasi</Text>
        <DatePickerCustom setNeedDate={setMoneyGiveDate} text={moneyGiveDate} />
      </View>

      <TextInput
        multiline
        placeholder="Qo'shimcha ma'lumotlar"
        value={note}
        onChangeText={setNote}
        style={tw`w-10.5/12 h-20 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] mx-auto my-[1%] px-2 py-2`}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={sendSimpleSale}
        style={tw`w-5/12 h-15 bg-[#323054] mx-auto my-2 rounded-2xl`}>
        <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SimpleSale;
