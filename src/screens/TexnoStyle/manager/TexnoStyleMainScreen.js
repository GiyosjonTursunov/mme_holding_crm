/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Animated,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import tw from 'twrnc';
import {baseUrl, mainUrl} from '../../../config/apiUrl';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TexnoStyleMainScreen = () => {
  const navigation = useNavigation();
  const {token} = useSelector(state => state.userReducer);
  const [doors, setDoors] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('screen');
  const Item_width = width * 0.8;
  const Item_height = Item_width * 1.2;

  useEffect(() => {
    if (token) {
      axios({
        url: `${mainUrl}texno-style/doors/`,
        method: 'GET',
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then(res => {
          setDoors(res.data);
        })
        .catch(err => {
          console.error('error =>', err);
        });
    }
  }, [token]);

  return (
    <ScrollView style={tw`bg-white pt-3`} showsVerticalScrollIndicator={false}>
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Umumiy summa</Text>
        <Text style={tw`text-xl`}>1000</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Foyda</Text>
        <Text style={tw`text-xl`}>200</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Eshik ko'rinishida pullar</Text>
        <Text style={tw`text-xl`}>800</Text>
      </View>
      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />
      <View style={tw`flex-row justify-between w-full px-4 items-center`}>
        <Text style={tw`text-xl`}>Eshiklar</Text>
        <Text style={tw`text-xl`}>100</Text>
      </View>

      <View style={tw`w-11/12 border border-[rgba(0,0,0,0.4)] mx-auto mb-5`} />

      <TouchableOpacity
        onPress={() => navigation.navigate('TexnoStyleCreateDoorsScreen')}
        style={tw`w-8/12 h-15 bg-[#323054] mx-auto my-2 rounded-xl`}>
        <Text style={tw`text-white text-xl m-auto`}>Eshik qo'shish</Text>
      </TouchableOpacity>

      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={doors}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View
              key={item.id}
              style={{width, justifyContent: 'center', alignItems: 'center'}}>
              <Pressable
                onPress={() => console.log('dress_clicked')}
                style={{
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOpacity: 0.5,
                  shadowRadius: 7,
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                  elevation: 8,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                  backgroundColor: '#fff',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    width: Item_width,
                    height: Item_height * 1.4,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}>
                  <Animated.Image
                    source={{uri: baseUrl + item.img}}
                    style={{
                      width: Item_width * 1.1,
                      height: Item_height,
                      resizeMode: 'cover',
                      transform: [{translateX}],
                    }}
                  />

                  <Animated.View
                    style={[
                      tw`mx-auto w-full mt-2 pl-3`,
                      {transform: [{translateX}]},
                    ]}>
                    <Text style={tw`text-xl text-black`}>
                      Eshik: {item?.name}
                    </Text>
                    <Text
                      style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                      Narxi: {item?.price}
                    </Text>
                    <Text
                      style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                      Soni: {item?.count}
                    </Text>
                    <View
                      style={tw`flex-row justify-between items-center mt-3 h-10`}>
                      <Text
                        style={tw`text-lg font-semibold text-[rgba(0,0,0,0.7)]`}>
                        {item?.date_created}
                      </Text>

                      <Image
                        source={require('../../../../assets/openNew.png')}
                        style={tw`w-8 h-8`}
                        resizeMode="contain"
                      />
                    </View>
                  </Animated.View>
                </View>
              </Pressable>
            </View>
          );
        }}
      />

      <View style={tw`w-full h-15`} />
    </ScrollView>
  );
};

export default TexnoStyleMainScreen;
