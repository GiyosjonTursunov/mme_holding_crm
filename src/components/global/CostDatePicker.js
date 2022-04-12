import * as React from 'react';
import {View, Text} from 'react-native';
import directorGController from '../../controllers/directorManager/get';
import DatePickerCustom from './DatePickerCustom';
import tw from 'twrnc';

const {useState} = React;

const CostDatePicker = ({isSerio}) => {
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [filteredCosts, setFilteredCosts] = useState({});

  return (
    <View style={tw`flex-col h-30`}>
      <View
        style={tw`w-full h-[50%] flex-row justify-between items-center px-1`}>
        <View style={tw`w-5/12 flex flex-row items-center`}>
          <DatePickerCustom
            setNeedDate={data => {
              setDateStart(data);
              directorGController.getCostsStatisticsByDate(
                {
                  date_start: dateStart,
                  date_end: data,
                  is_serio: isSerio,
                },
                setFilteredCosts,
              );
            }}
          />
          <Text style={tw`m-auto text-black`}>{dateStart}</Text>
        </View>
        <Text style={tw`font-bold text-xl text-black`}>{'<->'}</Text>
        <View style={tw`w-5/12 flex flex-row items-center`}>
          <DatePickerCustom
            setNeedDate={data => {
              setDateEnd(data);
              directorGController.getCostsStatisticsByDate(
                {
                  date_start: dateStart,
                  date_end: data,
                  is_serio: isSerio,
                },
                setFilteredCosts,
              );
            }}
          />
          <Text style={tw`m-auto text-black`}>{dateEnd}</Text>
        </View>
      </View>
      <View
        style={[
          tw`flex-row justify-between items-center p-[3%] m-auto w-11/12 bg-[#FEF6E1] rounded-xl`,
          {
            shadowColor: '#000',
            shadowOpacity: 0.16,
            shadowRadius: 2.5,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            elevation: 2,
          },
        ]}>
        <Text>{filteredCosts.price ? 'Summa' : 'Malumot yo`q'}</Text>
        <Text>
          {filteredCosts.price ? filteredCosts.price : 'Malumot yo`q'}
        </Text>
      </View>
    </View>
  );
};

export default CostDatePicker;
