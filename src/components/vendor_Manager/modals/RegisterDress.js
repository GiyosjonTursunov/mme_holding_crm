/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from 'twrnc';
import {ImagePickerModal} from '../../../modals/image-picker-modal';
import axios from 'axios';
import {baseUrl, mainUrl} from '../../../config/apiUrl';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import ShleftList from './ShleftList';
import ColorList from './ColorList';
import LoadingLottie from '../../global/LoadingLottie';
import ImageZoomCustom from '../../modal/ImageZoomCustom';
import ImageOptimize from '../../global/CustomImage';

const RegisterDress = ({
  setDressId,
  setMainPriceSale,
  setColorId,
  setSelectedShleftId,
  setSelectedShleftName,
}) => {
  const {token, userId} = useSelector(state => state.userReducer);

  const [shleftId, setShleftId] = useState('');
  const [selectedColorId, setSelectedColorId] = useState('');

  const [dressModalVisible, setDressModalVisible] = useState(false);
  const [registerDressModalVisible, setRegisterDressModalVisible] =
    useState(false);
  const [dressImg1ChooseModalVisible, setDressImg1ChooseModalVisible] =
    useState(false);
  const [dressImg2ChooseModalVisible, setDressImg2ChooseModalVisible] =
    useState(false);
  const [dressImg3ChooseModalVisible, setDressImg3ChooseModalVisible] =
    useState(false);

  const [dressList, setDressList] = useState([]);

  const [dressForSelect, setDressForSelect] = useState('');

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [dressImg, setDressImg] = useState([]);

  const getDressIdForSale = (
    id,
    name,
    mainPriceSale,
    color,
    shleft,
    all,
    shleftName,
    img1,
    img2,
    img3,
  ) => {
    setDressId ? setDressId(id) : null;
    setDressForSelect(name);
    setMainPriceSale ? setMainPriceSale(mainPriceSale) : null;
    setDressModalVisible(false);
    setColorId ? setColorId(color) : null;
    console.warn('color', color);
    console.warn('all ', all);
    setSelectedShleftId ? setSelectedShleftId(shleft) : null;
    setSelectedShleftName ? setSelectedShleftName(shleftName) : null;
    setDressImg([img1, img2, img3]);
  };

  const getDress = () => {
    axios({
      url: `${mainUrl}lastoria/dress/`,
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
      },
    })
      .then(res => {
        // if (res.data.length === dressList.length) {
        //   return null;
        // } else {
        setDressList(res.data);
        console.error('dressList', res.data);
        // }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const [dressName, setDressName] = useState('');
  const [mainPrice, setMainPrice] = useState('');

  const [dressNote, setDressNote] = useState('');

  const [nameImage1, setNameImage1] = useState('');
  const [nameImage2, setNameImage2] = useState('');
  const [nameImage3, setNameImage3] = useState('');
  const [uriImage1, setUriImage1] = useState('');
  const [uriImage2, setUriImage2] = useState('');
  const [uriImage3, setUriImage3] = useState('');
  const [typeImage1, setTypeImage1] = useState('');
  const [typeImage2, setTypeImage2] = useState('');
  const [typeImage3, setTypeImage3] = useState('');

  const [selectedDressImg, setSelectedDressImg] = useState();

  const [selectedDressImgModalVisible, setSelectedDressImgModalVisible] =
    useState(false);

  const DressItem = ({
    id,
    name,
    price,
    color,
    shleft,
    all,
    shleftName,
    img1,
    img2,
    img3,
  }) => {
    return (
      <View
        style={tw`w-11.7/12 border-b flex-row border-[rgba(0,0,0,0.1)] mx-auto m-2`}>
        <TouchableOpacity
          onPress={() => {
            console.warn('img1', baseUrl + img1);
            setSelectedDressImg(baseUrl + img1);
            setSelectedDressImgModalVisible(true);
          }}
          style={tw`w-4/12 h-25`}>
          <Image
            source={{uri: baseUrl + img1}}
            style={tw`w-full h-full`}
            resizeMode="contain"
          />
          <ImageZoomCustom
            selectedDressImgModalVisible={selectedDressImgModalVisible}
            setSelectedDressImgModalVisible={setSelectedDressImgModalVisible}
            selectedDressImg={selectedDressImg}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-8/12 pl-2 justify-center`}
          onPress={() => {
            getDressIdForSale(
              id,
              name,
              price,
              color,
              shleft,
              all,
              shleftName,
              img1,
              img2,
              img3,
            );
          }}>
          <Text style={tw`text-lg`}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDress = ({item}) => (
    <DressItem
      name={item.name}
      id={item.id}
      price={item.price}
      color={item.color}
      shleft={item.shleft.id}
      shleftName={item.shleft.name}
      img1={item.img1}
      img2={item.img2}
      img3={item.img3}
      img4={item.img4}
      all={item}
    />
  );

  const onImage1LibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage1(image.assets[0].fileName);
        setUriImage1(image.assets[0].uri);
        setTypeImage1(image.assets[0].type);
        setDressImg1ChooseModalVisible(false);
      },
    );
  }, []);

  const onImage2LibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage2(image.assets[0].fileName);
        setUriImage2(image.assets[0].uri);
        setTypeImage2(image.assets[0].type);
        setDressImg2ChooseModalVisible(false);
      },
    );
  }, []);

  const onImage3LibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage3(image.assets[0].fileName);
        setUriImage3(image.assets[0].uri);
        setTypeImage3(image.assets[0].type);
        setDressImg3ChooseModalVisible(false);
      },
    );
  }, []);

  const formDataImg = new FormData();

  const createDress = async () => {
    console.warn(token);
    if (dressName && Number(mainPrice)) {
      setShowLoading(true);
      console.log(dressName, mainPrice);
      formDataImg.append('name', dressName);
      formDataImg.append('price', mainPrice);
      formDataImg.append('user', userId);
      formDataImg.append('note', dressNote);
      formDataImg.append('shleft', shleftId);
      formDataImg.append('color', selectedColorId);

      formDataImg.append('img1', {
        uri: uriImage1,
        type: typeImage1,
        name: nameImage1,
      });

      formDataImg.append('img2', {
        uri: uriImage2,
        type: typeImage2,
        name: nameImage2,
      });

      formDataImg.append('img3', {
        uri: uriImage3,
        type: typeImage3,
        name: nameImage3,
      });

      let url = `${mainUrl}lastoria/dress/`;
      let res = await fetch(url, {
        method: 'POST',
        body: formDataImg,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'token ' + token,
        },
      });
      if (res.status === 201) {
        setShowLoading(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
        setDressName('');
        setMainPrice('');
        setDressNote('');
        setUriImage1('');
        setUriImage2('');
        setUriImage3('');
        setNameImage1('');
        setNameImage2('');
        setNameImage3('');
        setTypeImage1('');
        setTypeImage2('');
        setTypeImage3('');
        setIsEnabled(false);
      } else {
        setShowLoading(false);
        setTimeout(() => {
          Alert.alert('Bazada xatolik');
        }, 300);
      }
    } else {
      Alert.alert("Iltimos, majburiy ma'lumotlarni to'g'ri to'ldiring");
    }
  };

  return (
    <View
      style={tw`w-11/12 h-11 mx-auto my-[2%] flex-row justify-between items-center`}>
      <TouchableOpacity
        onPress={() => {
          setDressModalVisible(true);
          getDress();
        }}
        style={tw`w-10.5/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-xl pl-3 flex-row justify-between items-center pr-5`}>
        <View style={tw`h-full flex-row items-center `}>
          <Text style={tw`text-base font-semibold text-gray-500`}>
            Ko`ylak:
          </Text>
          <Text style={tw`font-semibold text-black ml-2 text-base`}>
            {dressForSelect}
          </Text>
        </View>

        <Image
          style={tw`w-8 h-8`}
          source={require('../../../../assets/down.png')}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={dressModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setDressModalVisible(!dressModalVisible);
          }}>
          <View
            style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
            {/* <View
              style={tw`w-10.5/12 h-100 bg-[#F1EFF7] rounded-2xl justify-around relative`}> */}
            <View
              style={tw`w-10.5/12 mx-auto h-90 bg-[#FBFBFB] rounded-3xl rounded-2xl p-2`}>
              <Pressable
                style={tw`absolute right-[-2%] top-[-10px]`}
                onPress={() => setDressModalVisible(false)}>
                <Image
                  source={require('../../../../assets/x-button.png')}
                  style={tw`w-9 h-9`}
                />
              </Pressable>
              <FlatList
                data={dressList}
                renderItem={renderDress}
                keyExtractor={item => item.id}
              />
            </View>
            {/* </View> */}
          </View>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRegisterDressModalVisible(true)}>
        <Image
          source={require('../../../../assets/plus.png')}
          style={tw`w-8 h-8`}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={registerDressModalVisible}
          onRequestClose={() => {
            setRegisterDressModalVisible(!registerDressModalVisible);
          }}>
          <View
            style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
            <View
              style={tw`w-11/12 h-145 bg-white rounded-3xl justify-around items-center`}>
              <Text style={tw`text-base mx-auto font-semibold`}>
                Ko'ylak kiritish oynasi
              </Text>

              <Pressable
                style={tw`absolute right-[-2%] top-[-10px]`}
                onPress={() => setRegisterDressModalVisible(false)}>
                <Image
                  source={require('../../../../assets/x-button.png')}
                  style={tw`w-9 h-9`}
                />
              </Pressable>

              <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                  onChangeText={setDressName}
                  value={dressName}
                  placeholder="Ko'ylak nomi"
                  style={tw`w-full h-10 border border-[rgba(0,0,0,0.5)] rounded-xl text-base font-semibold pl-3 my-[1%]`}
                />

                <TextInput
                  onChangeText={setMainPrice}
                  value={mainPrice}
                  placeholder="Ko'ylak narxi"
                  style={tw`w-full h-10 border border-[rgba(0,0,0,0.5)] rounded-xl text-base font-semibold pl-3 my-[1%]`}
                  keyboardType="numeric"
                />

                <View style={tw`flex-row items-center justify-between my-[1%]`}>
                  <TouchableOpacity
                    onPress={() => setDressImg2ChooseModalVisible(true)}
                    style={tw`w-7.5/12 h-10 flex-row rounded-xl border border-[rgba(0,0,0,0.5)]`}>
                    <View style={tw`w-8/12 h-full pl-2`}>
                      <Text
                        style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                        Rasmi: {nameImage2}
                      </Text>
                    </View>
                    <View
                      style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-xl rounded-tr-xl`}>
                      <Text style={tw`text-base m-auto text-white`}>Files</Text>
                    </View>

                    <ImagePickerModal
                      isVisible={dressImg2ChooseModalVisible}
                      onClose={() => setDressImg2ChooseModalVisible(false)}
                      onImageLibraryPress={onImage2LibraryPress}
                      onCameraPress={() => console.log('camera pressed')}
                    />
                  </TouchableOpacity>

                  <Text>Old yaqin</Text>
                </View>

                {uriImage2 ? (
                  <Image source={{uri: uriImage2}} style={tw`w-full h-50`} />
                ) : null}

                <View style={tw`flex-row items-center justify-between my-[1%]`}>
                  <TouchableOpacity
                    onPress={() => setDressImg1ChooseModalVisible(true)}
                    style={tw`w-7.5/12 h-10 flex-row rounded-xl border border-[rgba(0,0,0,0.5)]`}>
                    <View style={tw`w-8/12 h-full pl-2`}>
                      <Text
                        style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                        Rasmi: {nameImage1}
                      </Text>
                    </View>
                    <View
                      style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-xl rounded-tr-xl`}>
                      <Text style={tw`text-base m-auto text-white`}>Files</Text>
                    </View>

                    <ImagePickerModal
                      isVisible={dressImg1ChooseModalVisible}
                      onClose={() => setDressImg1ChooseModalVisible(false)}
                      onImageLibraryPress={onImage1LibraryPress}
                      onCameraPress={() => console.log('camera pressed')}
                    />
                  </TouchableOpacity>

                  <Text style={tw`ml-[2%]`}>Old to'liq</Text>
                </View>

                {uriImage1 ? (
                  <Image source={{uri: uriImage1}} style={tw`w-full h-50`} />
                ) : null}

                <View style={tw`flex-row items-center justify-between my-[1%]`}>
                  <TouchableOpacity
                    onPress={() => setDressImg3ChooseModalVisible(true)}
                    style={tw`w-7.5/12 h-10 flex-row rounded-xl border border-[rgba(0,0,0,0.5)]`}>
                    <View style={tw`w-8/12 h-full pl-2`}>
                      <Text
                        style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                        Rasmi: {nameImage3}
                      </Text>
                    </View>
                    <View
                      style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-xl rounded-tr-xl`}>
                      <Text style={tw`text-base m-auto text-white`}>Files</Text>
                    </View>

                    <ImagePickerModal
                      isVisible={dressImg3ChooseModalVisible}
                      onClose={() => setDressImg3ChooseModalVisible(false)}
                      onImageLibraryPress={onImage3LibraryPress}
                      onCameraPress={() => console.log('camera pressed')}
                    />
                  </TouchableOpacity>

                  <Text>Orqa tomon</Text>
                </View>

                {uriImage3 ? (
                  <Image source={{uri: uriImage3}} style={tw`w-full h-50`} />
                ) : null}

                <View
                  style={tw`flex-row justify-between items-center w-10/12 mx-auto`}>
                  <ShleftList
                    setShleftId={setShleftId}
                    setSelectedShleftId={setSelectedShleftId}
                  />
                  <ColorList
                    setSelectedColorId={setSelectedColorId}
                    setColorId={setColorId}
                  />
                </View>

                <TouchableOpacity
                  onPress={createDress}
                  style={tw`w-5.5/12 h-12 bg-[#242424] mx-auto rounded-full`}>
                  <Text style={tw`text-white text-base font-bold m-auto`}>
                    Saqlash
                  </Text>
                  <LoadingLottie
                    animation={require('../../../../assets/lottie/loading-bubbles.json')}
                    setShowLoading={setShowLoading}
                    showLoading={showLoading}
                  />

                  <LoadingLottie
                    animation={require('../../../../assets/lottie/success.json')}
                    setShowLoading={setShowSuccess}
                    showLoading={showSuccess}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDress;
