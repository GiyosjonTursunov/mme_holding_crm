import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  Switch,
  AsyncStorage,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import RegisterSalonModal from './RegisterSalonModal';
import ListSalon from './ListSalon';
import getToken from '../../controllers/getToken';
import DatePickerCustom from '../global/DatePickerCustom';
import * as ImagePicker from 'react-native-image-picker';

const {useEffect, useState, useCallback} = React;
import {mainUrl} from '../../config/apiUrl';
import {ImagePickerModal} from '../../screens/directorAndManager/modals/image-picker-modal';

const Sales = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dressModalVisible, setDressModalVisible] = useState(false);
  const [salonModalVisible, setSalonModalVisible] = useState(false);
  const [dressList, setDressList] = useState([]);
  const [dressName, setDressName] = useState('');
  const [dressCount, setDressCount] = useState('');
  const [mainPrice, setMainPrice] = useState('');
  const [dressNote, setDressNote] = useState('');
  const [givenPrice, setGivenPrice] = useState('');
  const [leftPrice, setLeftPrice] = useState('000000');
  const [dateLeftPrice, setDateLeftPrice] = useState('');
  const [soldByPhone, setSoldByPhone] = useState(false);
  const [salonList, setSalonList] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [needSend, setNeedSend] = useState(false);

  const [dressId, setDressId] = useState('');
  const [dressForSelect, setDressForSelect] = useState('');
  const [salonId, setSalonId] = useState('');

  const [salonModalRegisterVisible, setSalonModalRegisterVisible] =
    useState(false);
  const [userJson, setUserJson] = useState([]);
  const [selectedSalonName, setSelectedSalonName] = useState('');

  const [dressImgPickerResponse, setDressImgPickerResponse] = useState(null);
  const [dressImgChooseModalVisible, setDressImgChooseModalVisible] =
    useState(false);
  const [nameImage, setNameImage] = useState('');
  const [uriImage, setUriImage] = useState('');
  const [typeImage, setTypeImage] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const formDataMagazine = new FormData();

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setDressImgPickerResponse).then(
      async image => {
        setNameImage(image.assets[0].fileName);
        setUriImage(image.assets[0].uri);
        setTypeImage(image.assets[0].type);
        setDressImgChooseModalVisible(false);
      },
    );
  }, []);

  const createDress = async () => {
    if (dressName && Number(mainPrice)) {
      formDataMagazine.append('name', dressName);
      formDataMagazine.append('price', mainPrice);
      formDataMagazine.append('user', userJson.id);
      formDataMagazine.append('note', dressNote);
      formDataMagazine.append('is_published', isEnabled);

      formDataMagazine.append('img', {
        uri: uriImage,
        type: typeImage,
        name: nameImage,
      });

      let url = `${mainUrl}lastoria/dress/`;
      let res = await fetch(url, {
        method: 'POST',
        body: formDataMagazine,
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
      setModalVisible(false);
    } else {
      Alert.alert("Iltimos, majburiy ma'lumotlarni to'g'ri to'ldiring");
    }
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

  const getDressIdForSale = (id, name) => {
    setDressId(id);
    setDressForSelect(name);
    setDressModalVisible(false);
  };

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

  const getSalonList = () => {
    axios({
      url: `${mainUrl}lastoria/salon/`,
      method: 'GET',
      headers: {
        Authorization: 'token ' + userJson.token,
      },
    })
      .then(res => {
        console.warn(res.data);
        setSalonModalVisible(true);
        setSalonList(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const sendSale = () => {
    if (
      Number(dressId) &&
      Number(dressCount) &&
      Number(mainPrice) &&
      dressNote &&
      Number(givenPrice) &&
      Number(leftPrice) &&
      dateLeftPrice &&
      Number(salonId) &&
      deliveryDate
    ) {
      let dataCreateSale = {
        dress_count: dressCount,
        main_price: mainPrice,
        dress_note: dressNote,
        given_price: givenPrice,
        left_price: leftPrice,
        date_left_price: dateLeftPrice,
        delivery_date: deliveryDate,
        dress: dressId,
        sold_by_phone: soldByPhone,
        salon: salonId,
        need_send: needSend,
        magazine_id: userJson.magazines_id,
        user: userJson.id,
      };

      axios({
        url: `${mainUrl}lastoria/orders/`,
        method: 'post',
        data: dataCreateSale,
        headers: {
          Authorization: 'token ' + userJson.token,
        },
      })
        .then(res => {
          if (res.status === 201) {
            Alert.alert('Saqlandi');
          }
        })
        .catch(err => {
          console.warn(err);
          Alert.alert("To'ldirishda hatolik bor qayta tekshiring…");
        });
    } else {
      Alert.alert("To'ldirishda hatolik bor qayta tekshiring…");
    }
  };

  useEffect(() => {
    getToken.token(setUserJson);
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'position' : null}>
        <View
          style={tw`w-11/12 h-12 flex-row justify-between items-center mx-auto my-[1%]`}>
          <TouchableOpacity
            onPress={() => {
              setDressModalVisible(true);
              getDress();
            }}
            style={tw`w-10.5/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-xl pl-3`}>
            <View style={tw`flex-row my-auto`}>
              <Text style={tw`text-base font-semibold text-gray-400`}>
                Ko`ylak:
              </Text>
              <Text style={tw`font-semibold text-black ml-2 text-base`}>
                {dressForSelect}
              </Text>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={dressModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!dressModalVisible);
              }}>
              <View
                style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                <View
                  style={tw`w-10.5/12 h-100 bg-[#F1EFF7] rounded-2xl justify-around relative`}>
                  <Pressable
                    style={tw`absolute right-2 top-[-10px]`}
                    onPress={() => setDressModalVisible(false)}>
                    <Image
                      source={require('../../../assets/x-button.png')}
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
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../../assets/plus.png')}
              style={tw`w-8 h-8`}
            />

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={tw`w-11/12 h-90 bg-white rounded-3xl justify-around items-center`}>
                  <Text style={tw`text-base mx-auto font-semibold`}>
                    Ko'ylak kiritish oynasi
                  </Text>
                  <TextInput
                    onChangeText={setDressName}
                    value={dressName}
                    placeholder="Ko'ylak nomi"
                    style={tw`w-10/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-3xl text-base font-semibold pl-3`}
                  />
                  <TextInput
                    onChangeText={setMainPrice}
                    value={mainPrice}
                    placeholder="Ko'ylak narxi"
                    style={tw`w-10/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-3xl text-base font-semibold pl-3`}
                  />
                  <View
                    style={tw`flex-row items-center justify-between w-10/12`}>
                    <TouchableOpacity
                      onPress={() => setDressImgChooseModalVisible(true)}
                      style={tw`w-8/12 h-10 flex-row rounded-3xl border border-[rgba(0,0,0,0.5)]`}>
                      <View style={tw`w-8/12 h-full pl-2`}>
                        <Text
                          style={tw`my-auto text-base text-[rgba(0,0,0,0.5)]`}>
                          Rasmi: {nameImage}
                        </Text>
                      </View>
                      <View
                        style={tw`w-4/12 h-full border-l bg-[#242424] rounded-br-3xl rounded-tr-3xl`}>
                        <Text style={tw`text-base m-auto text-white`}>
                          Files
                        </Text>
                      </View>

                      <ImagePickerModal
                        isVisible={dressImgChooseModalVisible}
                        onClose={() => setDressImgChooseModalVisible(false)}
                        onImageLibraryPress={onImageLibraryPress}
                        onCameraPress={() => console.log('camera pressed')}
                      />
                    </TouchableOpacity>
                    {/* <Text>salom</Text> */}
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>

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
        <View
          style={tw`w-11/12 h-12 flex-row justify-between items-center mx-auto mb-[1%]`}>
          <TextInput
            placeholder="Ko`ylak soni"
            value={dressCount}
            onChangeText={setDressCount}
            style={tw`w-5/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-2xl font-semibold pl-3`}
          />
          <TextInput
            placeholder="Kelishilgan narxi"
            value={mainPrice}
            onChangeText={setMainPrice}
            style={tw`w-6/12 h-10 border border-[rgba(0,0,0,0.5)] rounded-2xl text-base font-semibold pl-3`}
          />
        </View>
        <TextInput
          multiline
          placeholder="Ko`ylak haqida"
          value={dressNote}
          onChangeText={setDressNote}
          style={tw`mb-[2%] w-11/12 h-20 border text-base font-semibold rounded-2xl border-[rgba(0,0,0,0.5)] mx-auto mb-[1%] p-1`}
        />
        <View
          style={tw`w-11/12 h-10 flex-row justify-between items-center mx-auto my-[1%]`}>
          <TextInput
            placeholder="Berilgan summa"
            value={givenPrice}
            onChangeText={text => {
              setGivenPrice(text);
              // shu yerga debounce qo'yish kerak…
              setLeftPrice(String(Number(mainPrice) - Number(text)));
            }}
            style={tw`w-6/12 h-full border border-[rgba(0,0,0,0.5)] rounded-2xl text-base font-semibold pl-3`}
          />
          <Text style={tw`w-5/12 text-base`}>Qoldi: {leftPrice} so'm</Text>
        </View>
        <View style={tw`w-11/12 h-12 flex-row items-center mx-auto my-[1%]`}>
          <View style={tw`flex-row items-center mx-auto`}>
            <Text style={tw`font-medium`}>Berish sanasi:</Text>
            <View>
              <DatePickerCustom
                setNeedDate={setDateLeftPrice}
                func={() => {
                  setLeftPrice(String(Number(mainPrice) - Number(givenPrice)));
                  console.log(String(Number(mainPrice) - Number(givenPrice)));
                }}
              />
              <Text>{dateLeftPrice}</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-around items-center mx-auto`}>
            <Text style={tw`font-medium`}>Telefonda:</Text>
            <TouchableOpacity
              onPress={() => setSoldByPhone(!soldByPhone)}
              style={tw`w-2/12 h-6/12 border rounded-lg`}>
              <Text style={tw`m-auto`}>{soldByPhone && '✅'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={tw`w-10/12 h-12 flex-row justify-between items-center mx-auto my-[1%] mb-2 border-b`}>
          <Text style={tw`text-base font-semibold`}>Mijoz haqida</Text>
          <TouchableOpacity onPress={() => setSalonModalRegisterVisible(true)}>
            <Image
              source={require('../../../assets/plus.png')}
              style={tw`w-8 h-8`}
            />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={salonModalRegisterVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setSalonModalRegisterVisible(!salonModalRegisterVisible);
            }}>
            <View
              style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
              <View
                style={tw`w-10.5/12 h-110 bg-[#F1EFF7] rounded-2xl justify-around`}>
                <View
                  style={tw`w-full h-8 pl-3 flex-row justify-start px-5 items-center`}>
                  <Text
                    style={tw`text-base text-[#004FFF]`}
                    onPress={() => setSalonModalRegisterVisible(false)}>
                    Close
                  </Text>
                  <Text style={tw`text-base font-semibold ml-[18%]`}>
                    Salon kiritish
                  </Text>
                </View>
                <RegisterSalonModal />
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          onPress={getSalonList}
          style={tw`w-10/12 h-10 border mx-auto rounded-2xl justify-between border-[rgba(0,0,0,0.3)] flex-row px-5 items-center`}>
          <Text style={tw`text-base text-[rgba(0,0,0,0.5)]`}>
            Salon:{' '}
            <Text style={tw`font-semibold text-black`}>
              {selectedSalonName}
            </Text>
          </Text>
          <Text style={tw`text-base text-[rgba(0,0,0,0.5)]`}>➡️</Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={salonModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setSalonModalVisible(!salonModalVisible);
            }}>
            <View
              style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
              <View
                style={tw`w-10.5/12 h-110 bg-[#F1EFF7] rounded-2xl justify-around`}>
                <View
                  style={tw`w-full h-8 pl-3 flex-row justify-start px-5 items-center`}>
                  <Text
                    style={tw`text-base text-[#004FFF]`}
                    onPress={() => setSalonModalVisible(false)}>
                    Close
                  </Text>
                  <Text style={tw`text-base font-semibold mx-auto`}>
                    Salonlar ro'yhati.
                  </Text>
                </View>
                <ListSalon
                  closeModal={setSalonModalVisible}
                  onPress={setSalonId}
                  listSalon={salonList}
                  selectedSalonName={setSelectedSalonName}
                />
              </View>
            </View>
          </Modal>
        </TouchableOpacity>
        <View style={tw`w-11/12 h-12 flex-row items-center mx-auto my-[1%]`}>
          <View style={tw`flex-row items-center mx-auto`}>
            <Text>Jo`natish sanasi:</Text>
            <View>
              <DatePickerCustom setNeedDate={setDeliveryDate} />
              <Text>{deliveryDate}</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-around items-center mx-auto`}>
            <Text>Yetkazish:</Text>
            <TouchableOpacity
              onPress={() => setNeedSend(!needSend)}
              style={tw`w-2.2/12 h-6/12 border rounded-lg`}>
              <Text style={tw`m-auto`}>{needSend && '✅'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={sendSale}
          style={tw`w-5.5/12 h-12 bg-[#242424] mx-auto mt-10 rounded-full`}>
          <Text style={tw`text-white text-base font-bold m-auto`}>Saqlash</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Sales;
