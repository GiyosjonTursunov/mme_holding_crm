import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPageScreen from '../screens/directorAndManager/MainPageScreen';
import AboutWorkScreen from '../screens/directorAndManager/AboutWorkScreen';

const Stack = createNativeStackNavigator();

const DirectorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPageScreen"
        component={MainPageScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="AboutWorkScreen" component={AboutWorkScreen} />
    </Stack.Navigator>
  );
};

export default DirectorStack;
