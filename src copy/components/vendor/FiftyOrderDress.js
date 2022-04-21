/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  TextInput,
  FlatList,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import tw from 'twrnc';
import RegisterDress from './modals/RegisterDress';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import getToken from '../../controllers/getToken';
import DatePickerCustom from '../global/DatePickerCustom';
import ListSalon from './ListSalon';
import RegisterSalonModal from './RegisterSalonModal';

const FiftyOrderDress = () => {
  const [userJson, setUserJson] = useState([]);

  const [dressId, setDressId] = useState('');
  const [shleftList, setShleftList] = useState([]);
  const [shleftListModalVisible, setShleftListModalVisible] = useState(false);
  const [shleftId, setShleftId] = useState('');
  const [shleftName, setShleftName] = useState('');
  const [mainPrice, setMainPrice] = useState('');

  const [note, setNote] = useState('');
  const [givenPrice, setGivenPrice] = useState('');
  const [leftPrice, setLeftPrice] = useState('');

  const [isPhoneEnabled, setIsPhoneEnabled] = useState(false);
  const togglePhoneSwitch = () =>
    setIsPhoneEnabled(previousState => !previousState);

  const [salonModalRegisterVisible, setSalonModalRegisterVisible] =
    useState(false);

  const [salonListModalVisible, setSalonListModalVisible] = useState(false);
  const [salonList, setSalonList] = useState([]);

  const [selectedSalonName, setSelectedSalonName] = useState('');
  const [salonId, setSalonId] = useState('');

  const [deliveryDate, setDeliveryDate] = useState('');

  const [needSend, setNeedSend] = useState(false);
  const toggleNeedSendSwitch = () =>
    setNeedSend(previousState => !previousState);

  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState('');
  const [selectedColorId, setSelectedColorId] = useState('');

  const [girlName, setGirlName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');

  const [isPassportEnabled, setIsPassportEnabled] = useState(false);
  const togglePassportSwitch = () =>
    setIsPassportEnabled(previousState => !previousState);
  const [salonGivenPrice, setSalonGivenPrice] = useState('');

  useEffect(() => {
    getToken.token(setUserJson);
  }, []);

  const getSalonList = () => {
    axios({
      url: `${mainUrl}lastoria/salon/`,
      method: 'GET',
      headers: {
        Authorization: 'token ' + userJson.token,
      },
    })
      .then(res => {
        setSalonListModalVisible(true);
        setSalonList(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const sendSale = () => {
    if (
      Number(dressId) &&
      Number(mainPrice) &&
      note &&
      Number(givenPrice) &&
      Number(leftPrice) >= 0 &&
      Number(salonId) &&
      deliveryDate
    ) {
      let dataCreateSale = {
        dress_count: 1,
        main_price: mainPrice,
        dress_note: note,
        given_price: givenPrice,
        left_price: leftPrice,
        delivery_date: deliveryDate,
        salon: salonId,
        dress: dressId,
        dress_detail: shleftId,
        magazine_id: userJson.magazines_id,
        user: userJson.id,
        sold_by_phone: isPhoneEnabled,
        need_send: needSend,
        status: 1,
        color: selectedColorId,
        isFifty: true,
        girl_name: girlName,
        wedding_date: weddingDate,
        ispassport: isPassportEnabled,
        salon_given_price: salonGivenPrice,
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
            // clear all fields
            setDressId('');
            setMainPrice('');
            setNote('');
            setGivenPrice('');
            setLeftPrice('');
            setSalonId('');
            setDeliveryDate('');
            setNeedSend(false);
            setSelectedColorName('');
            setSelectedColorId('');
            setSelectedSalonName('');
            setSalonId('');
            setShleftId('');
            setShleftName('');
          } else {
            Alert.alert('Xatolik');
          }
        })
        .catch(err => {
          console.warn(err);
          Alert.alert(
            "To'ldirishda hatolik yoki serverda hatolik bor qayta tekshiring…",
          );
        });
    } else {
      Alert.alert("To'ldirishda hatolik bor qayta tekshiring…");
      console.warn(
        Number(dressId),
        Number(mainPrice),
        note,
        Number(givenPrice),
        Number(leftPrice),
        Number(salonId),
        deliveryDate,
      );
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === 'ios' ? 'position' : null}>
        <RegisterDress userJson={userJson} setDressId={setDressId} />

        <TouchableOpacity
          style={tw`flex-row w-11/12 h-11 border my-2 mx-auto px-5 rounded-xl justify-between items-center border-[rgba(0,0,0,0.5)]`}
          onPress={() => setColorModalVisible(true)}>
          <Text style={tw`my-auto text-lg text-gray-500`}>
            Rang : {selectedColorName}
          </Text>

          <Image
            source={require('../../../assets/down.png')}
            style={tw`w-8 h-8`}
            resizeMode="contain"
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={colorModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setColorModalVisible(!colorModalVisible);
            }}>
            <View style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
              <View
                style={tw`absolute bottom-27 w-full h-40 justify-around items-center`}>
                <View
                  style={tw`w-11.5/12 bg-white h-40 justify-around items-center rounded-lg`}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedColorName('Telesniy');
                      setSelectedColorId('1');
                      setColorModalVisible(!colorModalVisible);
                    }}
                    style={[
                      tw`w-11/12 h-15 rounded-xl`,
                      {
                        shadowColor: '#000',
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowOffset: {
                          width: 1,
                          height: 1,
                        },
                        elevation: 3,
                        backgroundColor: '#ffff',
                      },
                    ]}>
                    <Text style={tw`text-2xl m-auto`}>Telesniy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedColorName('Ayveri');
                      setSelectedColorId('2');
                      setColorModalVisible(!colorModalVisible);
                    }}
                    style={[
                      tw`w-11/12 h-15 rounded-xl`,
                      {
                        shadowColor: '#000',
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        shadowOffset: {
                          width: 1,
                          height: 1,
                        },
                        elevation: 3,
                        backgroundColor: '#ffff',
                      },
                    ]}>
                    <Text style={tw`text-2xl m-auto`}>Ayveri</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setColorModalVisible(!colorModalVisible)}
                activeOpacity={0.9}
                style={tw`absolute bottom-10 w-10/12 h-15 bg-white rounded-xl left-[7.5%]`}>
                <Text style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </TouchableOpacity>
        <View style={tw`flex-row w-11/12 mx-auto justify-between items-center`}>
          <TouchableOpacity
            onPress={() => {
              axios({
                url: `${mainUrl}lastoria/dress-detail/`,
                method: 'GET',
              })
                .then(res => {
                  setShleftList(res.data);
                  setShleftListModalVisible(true);
                })
                .catch(err => {
                  console.error(err);
                });
            }}
            style={tw`flex-row items-center pr-2 w-5/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center`}>
            <Text
              style={tw`m-auto text-black text-base ${
                shleftName ? 'text-black' : 'text-[rgba(0,0,0,0.5)]'
              }`}>
              {shleftName ? shleftName : 'Shleft'}
            </Text>

            <Image
              source={require('../../../assets/down.png')}
              style={tw`w-8 h-8`}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={shleftListModalVisible}
              onRequestClose={() => {
                setShleftListModalVisible(false);
              }}>
              <View style={tw`flex-1 bg-[rgba(0,0,0,0.2)]`}>
                <View
                  style={tw`w-11.7/12 absolute bottom-27 h-80 left-[1.5%] bg-white rounded`}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={shleftList}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={[
                          tw`w-11/12 h-15 mx-auto my-2 bg-white rounded-2xl pl-3`,
                          {
                            shadowColor: '#000',
                            shadowOpacity: 0.5,
                            shadowRadius: 3,
                            shadowOffset: {
                              width: 1,
                              height: 1,
                            },
                            elevation: 3,
                            backgroundColor: '#ffff',
                          },
                        ]}
                        onPress={() => {
                          setShleftId(item.id);
                          setShleftName(item.name);
                          setShleftListModalVisible(false);
                        }}>
                        <Text style={tw`text-lg my-auto`}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setShleftListModalVisible(false)}
                  style={tw`w-11.7/12 h-15 bg-white mx-auto mt-3 rounded-2xl bg-white absolute bottom-10 left-[1.5%]`}>
                  <Text
                    style={tw`text-[#007AFF] font-semibold m-auto text-2xl`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </TouchableOpacity>

          <TextInput
            placeholder="Narx"
            value={mainPrice}
            onChangeText={setMainPrice}
            style={tw`w-5/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] text-center`}
            keyboardType="numeric"
          />
        </View>

        <TextInput
          multiline
          placeholder="Qo'shimcha ma'lumot"
          value={note}
          onChangeText={setNote}
          style={tw`w-11/12 h-25 border text-base font-semibold rounded-2xl border-[rgba(0,0,0,0.7)] mx-auto pl-1 pt-1 my-2`}
        />

        <TextInput
          placeholder="Kelin ismi"
          value={girlName}
          onChangeText={setGirlName}
          style={tw`w-11/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-2 mx-auto mb-2`}
        />

        <View style={tw`flex-row w-11/12 mx-auto justify-between`}>
          <TextInput
            placeholder="Kelin bergan pul"
            value={givenPrice}
            onChangeText={text => {
              setGivenPrice(text);
              setLeftPrice(Number(mainPrice) - Number(text));
            }}
            style={tw`w-7/12 h-11 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-2`}
            keyboardType="numeric"
          />

          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-lg`}>Qoldi :</Text>

            <Text style={tw`ml-3 text-lg`}>{leftPrice ? leftPrice : 0}</Text>
          </View>
        </View>

        <View
          style={tw`flex-row justify-between w-11/12 mx-auto my-2 items-center`}>
          <Text style={tw`text-lg`}>To'y sanasi:</Text>

          <DatePickerCustom setNeedDate={setWeddingDate} text={weddingDate} />
        </View>

        <View style={tw`flex-row w-full justify-around`}>
          <View style={tw`flex-row justify-between w-5/12 mx-auto`}>
            <Text style={tw`text-lg`}>Passport :</Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isPassportEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePassportSwitch}
              value={isPassportEnabled}
            />
          </View>

          <View style={tw`flex-row justify-between w-5/12 mx-auto`}>
            <Text style={tw`text-lg`}>Telda :</Text>

            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isPhoneEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePhoneSwitch}
              value={isPhoneEnabled}
            />
          </View>
        </View>

        <View
          style={tw`w-11/12 h-10.5 flex-row justify-between items-center mx-auto my-[1%] mb-2 border-b`}>
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
                  <TouchableOpacity
                    style={tw`absolute right-2 top-[-10px]`}
                    onPress={() => setSalonModalRegisterVisible(false)}>
                    <Image
                      source={require('../../../assets/x-button.png')}
                      style={tw`w-8 h-8`}
                    />
                  </TouchableOpacity>
                  <Text style={tw`text-base font-semibold ml-[18%]`}>
                    Salon kiritish
                  </Text>
                </View>
                <RegisterSalonModal />
              </View>
            </View>
          </Modal>
        </View>

        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={getSalonList}
            style={tw`w-5/12 h-10 border mx-auto rounded-2xl justify-between border-[rgba(0,0,0,0.3)] flex-row px-5 items-center`}>
            <Text style={tw`text-base text-[rgba(0,0,0,0.5)]`}>
              Salon:{' '}
              <Text style={tw`font-semibold text-black`}>
                {selectedSalonName}
              </Text>
            </Text>
            <Image
              source={require('../../../assets/down.png')}
              style={tw`w-8 h-8`}
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={salonListModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setSalonListModalVisible(!salonListModalVisible);
              }}>
              <View
                style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                <View
                  style={tw`w-10.5/12 h-110 bg-[#F1EFF7] rounded-2xl justify-around`}>
                  <View
                    style={tw`w-full h-8 pl-3 flex-row justify-start px-5 items-center`}>
                    <TouchableOpacity
                      style={tw`absolute right-2 top-[-10px]`}
                      onPress={() => setSalonListModalVisible(false)}>
                      <Image
                        source={require('../../../assets/x-button.png')}
                        style={tw`w-8 h-8`}
                      />
                    </TouchableOpacity>
                    <Text style={tw`text-base font-semibold mx-auto`}>
                      Salonlar ro'yhati.
                    </Text>
                  </View>
                  <ListSalon
                    closeModal={setSalonListModalVisible}
                    onPress={setSalonId}
                    listSalon={salonList}
                    selectedSalonName={setSelectedSalonName}
                  />
                </View>
              </View>
            </Modal>
          </TouchableOpacity>

          <TextInput
            placeholder="Salon bergan pul"
            value={salonGivenPrice}
            onChangeText={text => {
              setSalonGivenPrice(text);
            }}
            style={tw`w-5/12 h-10 border text-base font-semibold rounded-xl border-[rgba(0,0,0,0.5)] pl-2 mx-auto`}
            keyboardType="numeric"
          />
        </View>

        <View
          style={tw`flex-row justify-between w-11/12 mx-auto my-2 items-center`}>
          <Text style={tw`text-lg`}>Jo'natish sanasi : </Text>
          <DatePickerCustom
            setNeedDate={setDeliveryDate}
            text={deliveryDate}
            func={() =>
              setLeftPrice(
                prevState => Number(prevState) - Number(salonGivenPrice),
              )
            }
          />
        </View>

        <View style={tw`flex-row justify-between w-11/12 mx-auto`}>
          <Text style={tw`text-lg`}>Yetkazib berish :</Text>

          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={needSend ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNeedSendSwitch}
            value={needSend}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={sendSale}
          style={tw`w-5/12 h-15 bg-[#242424] mx-auto my-2 rounded-full`}>
          <Text style={tw`text-white text-xl m-auto`}>Saqlash</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default FiftyOrderDress;
