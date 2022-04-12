import React from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import tw from 'twrnc';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import AboutLaStoriaScreen from './AboutLaStoriaScreen';
import CostTypesScreen from './CostTypesScreen';

const Stack = createNativeStackNavigator();

const AboutWorkScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <ScrollView style={tw`bg-white`}>
        <Header headerName={'Ish haqida'} />
        <DoubleBtn
          firstBtnName={'Ish haqida'}
          secondBtnName={'Xarajatlar'}
          firstBtnFunction={() => {
            navigation.navigate('AboutLaStoriaScreen');
          }}
          secondBtnFunction={() => {
            navigation.navigate('CostTypesScreen', {director: true});
          }}
        />

        <View style={tw`w-full h-[650px]`}>
          <Stack.Navigator>
            <Stack.Screen
              name="AboutLaStoriaScreen"
              component={AboutLaStoriaScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="CostTypesScreen" component={CostTypesScreen} />
          </Stack.Navigator>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutWorkScreen;
