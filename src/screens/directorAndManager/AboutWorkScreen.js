import React from 'react';
import {SafeAreaView} from 'react-native';
import tw from 'twrnc';

import Header from '../../components/global/Header';

import AboutLaStoriaScreen from './AboutLaStoriaScreen';

const AboutWorkScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header headerName={'LaStoria'} />

      <AboutLaStoriaScreen />
    </SafeAreaView>
  );
};

export default AboutWorkScreen;
