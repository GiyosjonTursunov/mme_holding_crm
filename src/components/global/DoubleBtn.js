import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const DoubleBtn = ({
  firstBtnName,
  firstBtnFunction,
  secondBtnName,
  secondBtnFunction,
  setSerioProchi,
}) => {
  const [isAll, setIsAll] = useState(true);
  const [isSale, setIsSale] = useState(false);

  return (
    <View style={tw`flex-col justify-around`}>
      <View
        style={[
          tw`w-5/6 h-12 mx-auto flex-row border rounded-full p-1`,
          {backgroundColor: '#242424'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            setIsAll(true);
            setIsSale(false);
            firstBtnFunction ? firstBtnFunction() : null;
            // setSerioProchi ? setSerioProchi("serio") : null;
          }}
          style={tw`flex-1 rounded-full ${isAll ? `bg-white` : null}`}>
          <Text style={tw`m-auto  ${isAll ? `text-black` : `text-white`}`}>
            {firstBtnName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAll(false);
            setIsSale(true);
            secondBtnFunction ? secondBtnFunction() : null;
            // setSerioProchi ? setSerioProchi("prochi") : null;
          }}
          style={tw`flex-1 rounded-full ${isSale ? `bg-white` : null}`}>
          <Text style={tw`m-auto ${isSale ? `text-black` : `text-white`}`}>
            {secondBtnName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoubleBtn;
