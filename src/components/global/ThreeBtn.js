import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import tw from 'twrnc';

const ThreeBtn = ({
  firstBtnName,
  firstBtnNavigation,
  secondBtnName,
  secondBtnNavigation,
  thirdBtnName,
  thirdBtnNavigation,
  fourth,
}) => {
  const [isAll, setIsAll] = useState(true);
  const [isSale, setIsSale] = useState(false);
  const [isFifty, setIsFifty] = useState(false);

  return (
    <View
      style={[
        tw`w-${
          Dimensions.get('screen').width / 4.9
        } h-14 mx-auto flex-row rounded-full p-1`,
        {backgroundColor: '#242424'},
      ]}>
      <TouchableOpacity
        onPress={() => {
          firstBtnNavigation ? firstBtnNavigation() : null;
          setIsAll(true);
          setIsSale(false);
          setIsFifty(false);
        }}
        style={tw`flex-1 rounded-full ${isAll ? `bg-white` : null}`}>
        <Text style={tw`m-auto  ${isAll ? `text-black` : `text-white`}`}>
          {/* Ish haqida */}
          {firstBtnName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          secondBtnNavigation ? secondBtnNavigation() : null;
          setIsAll(false);
          setIsSale(true);
          setIsFifty(false);
        }}
        style={tw`flex-1 rounded-full ${isSale ? `bg-white` : null}`}>
        <Text style={tw`m-auto ${isSale ? `text-black` : `text-white`}`}>
          {/* Xarajatlar */}
          {secondBtnName}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          thirdBtnNavigation ? thirdBtnNavigation() : null;
          setIsAll(false);
          setIsSale(false);
          setIsFifty(true);
        }}
        style={tw`flex-1 rounded-full ${isFifty ? 'bg-white' : null}`}>
        {fourth ? (
          thirdBtnName
        ) : (
          <Text style={tw`m-auto ${isFifty ? 'text-black' : 'text-white'}`}>
            {thirdBtnName}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ThreeBtn;
