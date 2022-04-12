import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const Button = ({btnName, w, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        tw`w-${w ? w : '8/12'} h-15 mx-auto mt-8 rounded-xl`,
        {backgroundColor: '#354B91'},
      ]}
      onPress={onPress}>
      <Text style={[tw`m-auto`, {color: 'white'}]}>
        {btnName ? btnName : 'Kirish'}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
