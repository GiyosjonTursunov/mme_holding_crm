import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import axios from 'axios';
import RegisterDress from '../../../../src copy/components/vendor/modals/RegisterDress';

const SimpleSale = () => {
  const [dress_list, setDress_List] = useState([]);

  useEffect(() => {}, []);
  return (
    <View style={tw`flex-1 bg-white`}>
      <RegisterDress />
    </View>
  );
};

export default SimpleSale;
