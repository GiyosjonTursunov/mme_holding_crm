import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  FlatList,
  TextInput,
  Switch,
  AsyncStorage,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import tw from 'twrnc';
import {ImagePickerModal} from '../../../screens/directorAndManager/modals/image-picker-modal';
import axios from 'axios';
import {mainUrl} from '../../../config/apiUrl';
import * as ImagePicker from 'react-native-image-picker';

const RegisterDress = ({userJson, setDressId}) => {
  const [dressModalVisible, setDressModalVisible] = useState(false);
  const [registerDressModalVisible, setRegisterDressModalVisible] =
    useState(false);
  const [dressImg1ChooseModalVisible, setDressImg1ChooseModalVisible] =
    useState(false);
  const [dressImg2ChooseModalVisible, setDressImg2ChooseModalVisible] =
    useState(false);
  const [dressImg3ChooseModalVisible, setDressImg3ChooseModalVisible] =
    useState(false);
  const [dressImg4ChooseModalVisible, setDressImg4ChooseModalVisible] =
    useState(false);

  const [dressList, setDressList] = useState([]);

  const [dressForSelect, setDressForSelect] = useState('');

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const getDressIdForSale = (id, name) => {
    setDressId(id);
    setDressForSelect(name);
    setDressModalVisible(false);
  };

  const getDress = () => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        axios({
          url: `${mainUrl}lastoria/dress/`,
          method: 'GET',
          headers: {
            Authorization: 'token ' + JSON.parse(stringJson).token,
          },
        })
          .then(res => {
            if (res.data.length === dressList.length) {
              return null;
            } else {
              setDressList(res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [dressName, setDressName] = useState('');
  const [mainPrice, setMainPrice] = useState('');

  const [dressNote, setDressNote] = useState('');

  const [nameImage1, setNameImage1] = useState('');
  const [nameImage2, setNameImage2] = useState('');
  const [nameImage3, setNameImage3] = useState('');
  const [nameImage4, setNameImage4] = useState('');
  const [uriImage1, setUriImage1] = useState('');
  const [uriImage2, setUriImage2] = useState('');
  const [uriImage3, setUriImage3] = useState('');
  const [uriImage4, setUriImage4] = useState('');
  const [typeImage1, setTypeImage1] = useState('');
  const [typeImage2, setTypeImage2] = useState('');
  const [typeImage3, setTypeImage3] = useState('');
  const [typeImage4, setTypeImage4] = useState('');

  const DressItem = ({id, name}) => {
    return (
      <TouchableOpacity
        onPress={() => getDressIdForSale(id, name)}
        style={tw`w-11.7/12 h-11.5 border-b pl-3 flex-row items-center border-[rgba(0,0,0,0.1)] mx-auto`}>
        <Text style={tw`w-1.5/12 text-base font-bold`}>{id}</Text>
        <Text style={tw`my-auto text-lg`}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderDress = ({item}) => <DressItem name={item.name} id={item.id} />;

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

  const onImage4LibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage4(image.assets[0].fileName);
        setUriImage4(image.assets[0].uri);
        setTypeImage4(image.assets[0].type);
        setDressImg4ChooseModalVisible(false);
      },
    );
  }, []);

  const formDataImg = new FormData();

  const createDress = async () => {
    if (dressName && Number(mainPrice)) {
      formDataImg.append('name', dressName);
      formDataImg.append('price', mainPrice);
      formDataImg.append('user', userJson.id);
      formDataImg.append('note', dressNote);
      formDataImg.append('is_published', isEnabled);

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

      formDataImg.append('img4', {
        uri: uriImage4,
        type: typeImage4,
        name: nameImage4,
      });

      let url = `${mainUrl}lastoria/dress/`;
      let res = await fetch(url, {
        method: 'POST',
        body: formDataImg,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let responseJson = await res.json();
      console.log(responseJson, 'responseJson');
      Alert.alert("Ko'ylak qo'shildi");
      setDressName('');
      setMainPrice('');
      setDressNote('');
      setIsEnabled(false);
    } else {
      Alert.alert("Iltimos, majburiy ma'lumotlarni to'g'ri to'ldiring");
    }
  };

  return (
    <View
      style={tw`w-11/12 h-11 flex-row justify-between items-center mx-auto my-[1%]`}>
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
        {/* </View> */}
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
            <View
              style={tw`w-10.5/12 h-100 bg-[#F1EFF7] rounded-2xl justify-around relative`}>
              <Pressable
                style={tw`absolute right-2 top-[-10px]`}
                onPress={() => setDressModalVisible(false)}>
                <Image
                  source={require('../../../../assets/x-button.png')}
                  style={tw`w-8 h-8`}
                />
              </Pressable>
              <View
                style={tw`w-10.5/12 mx-auto h-83 bg-[#FBFBFB] rounded-3xl rounded-2xl`}>
                <FlatList
                  data={dressList}
                  renderItem={renderDress}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
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
          <TouchableOpacity
            onPress={() => setRegisterDressModalVisible(false)}
            style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
            <TouchableOpacity
              onPress={() => setRegisterDressModalVisible(true)}
              style={tw`w-11/12 h-120 bg-white rounded-3xl justify-around items-center`}>
              <Text style={tw`text-base mx-auto font-semibold`}>
                Ko'ylak kiritish oynasi
              </Text>

              <Pressable
                style={tw`absolute right-2 top-[-10px]`}
                onPress={() => setRegisterDressModalVisible(false)}>
                <Image
                  source={require('../../../../assets/x-button.png')}
                  style={tw`w-8 h-8`}
                />
              </Pressable>

              <TextInput
                onChangeText={setDressName}
                value={dressName}
                placeholder="Ko'ylak nomi"
                style={tw`w-10/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-3xl text-base font-semibold pl-3`}
              />
              <View style={tw`flex-row justify-between items-center w-10/12`}>
                <TextInput
                  onChangeText={setMainPrice}
                  value={mainPrice}
                  placeholder="Ko'ylak narxi"
                  style={tw`w-9/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-3xl text-base font-semibold pl-3`}
                />
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              {/* <View style={tw`w-10/12`}> */}
              <View style={tw`flex-row items-center justify-between my-1`}>
                <TouchableOpacity
                  onPress={() => setDressImg1ChooseModalVisible(true)}
                  style={tw`w-7.5/12 h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
                  <View style={tw`w-8/12 h-full pl-2`}>
                    <Text style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                      Rasmi: {nameImage1}
                    </Text>
                  </View>
                  <View
                    style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
                    <Text style={tw`text-base m-auto text-white`}>Files</Text>
                  </View>

                  <ImagePickerModal
                    isVisible={dressImg1ChooseModalVisible}
                    onClose={() => setDressImg1ChooseModalVisible(false)}
                    onImageLibraryPress={onImage1LibraryPress}
                    onCameraPress={() => console.log('camera pressed')}
                  />
                </TouchableOpacity>

                <Text>Old tomon</Text>
              </View>

              <View style={tw`flex-row items-center justify-between my-1`}>
                <TouchableOpacity
                  onPress={() => setDressImg2ChooseModalVisible(true)}
                  style={tw`w-7.5/12 h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
                  <View style={tw`w-8/12 h-full pl-2`}>
                    <Text style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                      Rasmi: {nameImage2}
                    </Text>
                  </View>
                  <View
                    style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
                    <Text style={tw`text-base m-auto text-white`}>Files</Text>
                  </View>

                  <ImagePickerModal
                    isVisible={dressImg2ChooseModalVisible}
                    onClose={() => setDressImg2ChooseModalVisible(false)}
                    onImageLibraryPress={onImage2LibraryPress}
                    onCameraPress={() => console.log('camera pressed')}
                  />
                </TouchableOpacity>

                <Text>Chap tomon</Text>
              </View>

              <View style={tw`flex-row items-center justify-between my-1`}>
                <TouchableOpacity
                  onPress={() => setDressImg3ChooseModalVisible(true)}
                  style={tw`w-7.5/12 h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
                  <View style={tw`w-8/12 h-full pl-2`}>
                    <Text style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                      Rasmi: {nameImage3}
                    </Text>
                  </View>
                  <View
                    style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
                    <Text style={tw`text-base m-auto text-white`}>Files</Text>
                  </View>

                  <ImagePickerModal
                    isVisible={dressImg3ChooseModalVisible}
                    onClose={() => setDressImg3ChooseModalVisible(false)}
                    onImageLibraryPress={onImage3LibraryPress}
                    onCameraPress={() => console.log('camera pressed')}
                  />
                </TouchableOpacity>

                <Text>O'ng tomon</Text>
              </View>

              <View style={tw`flex-row items-center justify-between my-1`}>
                <TouchableOpacity
                  onPress={() => setDressImg4ChooseModalVisible(true)}
                  style={tw`w-7.5/12 h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
                  <View style={tw`w-8/12 h-full pl-2`}>
                    <Text style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                      Rasmi: {nameImage4}
                    </Text>
                  </View>
                  <View
                    style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
                    <Text style={tw`text-base m-auto text-white`}>Files</Text>
                  </View>

                  <ImagePickerModal
                    isVisible={dressImg4ChooseModalVisible}
                    onClose={() => setDressImg4ChooseModalVisible(false)}
                    onImageLibraryPress={onImage4LibraryPress}
                    onCameraPress={() => console.log('camera pressed')}
                  />
                </TouchableOpacity>

                <Text>Orqa tomon</Text>
              </View>
              {/* </View> */}

              <TextInput
                multiline
                placeholder="Ko`ylak haqida"
                value={dressNote}
                onChangeText={setDressNote}
                style={tw`mb-[2%] w-10/12 h-20 border text-base font-semibold rounded-2xl border-[rgba(0,0,0,0.5)] mx-auto mb-[1%] p-1`}
              />
              <TouchableOpacity
                onPress={createDress}
                style={tw`w-5.5/12 h-12 bg-[#242424] mx-auto rounded-full`}>
                <Text style={tw`text-white text-base font-bold m-auto`}>
                  Saqlash
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterDress;
