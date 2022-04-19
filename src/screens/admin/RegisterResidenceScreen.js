/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import Input from '../../components/global/Input';
import axios from 'axios';
import directorGController from '../../controllers/directorManager/get';
import directorCController from '../../controllers/directorManager/create';

import {useNavigation} from '@react-navigation/native';
import {mainUrl} from '../../config/apiUrl';

const RegisterResidenceScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const allRoleList = [
    {
      id: 1,
      role: 'ADMIN',
    },
    {
      id: 2,
      role: 'DIRECTOR',
    },
    {
      id: 3,
      role: 'MANAGER',
    },
    {
      id: 4,
      role: 'VENDOR',
    },
    {
      id: 5,
      role: 'SUPPLIER',
    },
    {
      id: 6,
      role: 'WAREHOUSE',
    },
    {
      id: 7,
      role: 'SALON',
    },
  ];
  const [roleListModalVisible, setRoleListModalVisible] = useState(false);
  const [roleId, setRoleId] = useState('');

  const [allmagazineList, setAllmagazineList] = useState([]);
  const [magazineListModalVisible, setMagazineListModalVisible] =
    useState(false);
  const [magazineId, setMagazineId] = useState('');

  const [salonNomi, setSalonNomi] = useState('');

  // bu yerdan ikkita joyga send qiladigan funktsiya yozish kerak. biri user create bittasi salonlist create

  const clearInputs = () => {
    setPassword('');
    setName('');
    setPhone('');
    setMagazineId('');
    setRoleId('');
    setSalonNomi('');
  };

  const sendRegister = async () => {
    if (Number(phone)) {
      if (!phone || !password || !name) {
        Alert.alert('To`liq yozing');
      } else if (password.length < 4) {
        Alert.alert('Password 4tadan kop bolishi kerak');
      } else {
        let isCheckphoneData = {
          phone: phone.replace(/\s/g, ''),
        };
        const isPhoneUsed = await axios({
          url: `${mainUrl}admin/checkPhone`,
          method: 'POST',
          data: isCheckphoneData,
        });

        console.log(isCheckphoneData);

        if (isPhoneUsed.data) {
          Alert.alert('Bu telefon raqami mavjud');
        } else {
          if (roleId === '') {
            Alert.alert('Roleni tanlang');
          } else if (roleId === 7) {
            let dateForCreateSalon = {
              salonChiName: name,
              salonPhone: phone,
              password: password,
              salonName: salonNomi,
            };
            directorCController.createSalon(dateForCreateSalon);
          } else if (roleId === 1 || roleId === 2) {
            let dataIsCAndidate = {
              role_id: roleId,
            };
            const isCandidate = await axios({
              url: `${mainUrl}admin/checkIsCandidate`,
              method: 'POST',
              data: dataIsCAndidate,
            });
            if (isCandidate.data.length > 0) {
              // bazada 1 2 roleId lar boyicha candidate bor yoqligini tekshirish.
              Alert.alert(
                'Bu rol bilan account bazada mavjud va bir martadan kop account ochib bolmaydi',
              );
            } else {
              // no candidate
              // create account with this roles
              let dataAccount = {
                name: name,
                password: password,
                role_id: roleId,
                phone: phone,
              };
              const isCreatedRole = await axios({
                url: `${mainUrl}auth/registration`,
                method: 'POST',
                data: dataAccount,
              });
              if (isCreatedRole.data) {
                Alert.alert('account yaratildi');
                clearInputs();
              } else {
                Alert.alert('Account yaratilmadi');
              }
            }
          } else if (roleId === 3 || roleId === 5 || roleId === 6) {
            let dataAccount = {
              name: name,
              password: password,
              role_id: roleId,
              phone: phone,
            };
            const isCreatedRole = await axios({
              url: `${mainUrl}auth/registration`,
              method: 'POST',
              data: dataAccount,
            });
            if (isCreatedRole.data) {
              Alert.alert('account yaratildi');
              clearInputs();
            } else {
              Alert.alert('Account yaratilmadi');
            }
          } else if (roleId === 4 && !magazineId) {
            Alert.alert('Magazinni tanlang');
          } else if (roleId === 4 && magazineId) {
            Alert.alert('create qilamiz');
            // create account with this roles
            let dataAccount = {
              name: name,
              password: password,
              role_id: roleId,
              phone: phone,
              magazine_id: magazineId,
            };
            const isCreatedRole = await axios({
              url: `${mainUrl}auth/registration`,
              method: 'POST',
              data: dataAccount,
            });
            if (isCreatedRole.data) {
              Alert.alert('account yaratildi');
              clearInputs();
            } else {
              Alert.alert('Account yaratilmadi');
            }
          }
        }
      }
    } else {
      Alert.alert('Telefon raqamni to`g`ri kiriting');
    }
  };

  useEffect(() => {
    directorGController.getMagazineList(setAllmagazineList);
  }, []);

  const convertRoleName = role => {
    switch (role) {
      case 'ADMIN':
        return 'Admin';

      case 'DIRECTOR':
        return 'Director';

      case 'MANAGER':
        return 'Manager';

      case 'VENDOR':
        return 'Sotuvchi';

      case 'SUPPLIER':
        return 'Dostavkachi';

      case 'WAREHOUSE':
        return 'Omborxona';

      case 'SALON':
        return 'Salonchi';
    }
  };

  const ItemRole = ({id, role}) => (
    <TouchableOpacity
      style={tw`w-11/12 flex flex-row items-center justify-start p-2 border-b pl-5 mx-auto my-1`}
      activeOpacity={0.8}
      onPress={() => {
        setRoleId(id);
        setRoleListModalVisible(false);
      }}>
      <Text style={tw`mr-3 text-black`}>{id}</Text>
      <Text tw="text-base text-black">{convertRoleName(role)}</Text>
    </TouchableOpacity>
  );

  const renderRoleList = ({item}) => <ItemRole role={item.role} id={item.id} />;

  const ItemMagazine = ({magazine_Id, magazineName}) => (
    <TouchableOpacity
      style={tw`w-11/12 flex flex-row items-center justify-start p-2 border-b pl-5 mx-auto my-1`}
      activeOpacity={0.8}
      onPress={() => {
        setMagazineId(magazine_Id);
        setMagazineListModalVisible(false);
      }}>
      <Text style={tw`mr-3 text-black`}>
        {magazine_Id}. {magazineName}
      </Text>
    </TouchableOpacity>
  );

  const renderMagazineLis = ({item}) => (
    <ItemMagazine magazineName={item.name} magazine_Id={item.id} />
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView
        style={tw`flex-1 bg-white`}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === 'ios' ? 'position' : null}>
          <View style={tw`flex-1 relative mt-5`}>
            <Text style={tw`mx-auto text-7xl text-black`}>MME</Text>
            <Text style={tw`mx-auto text-xs mt-[-3%] mb-[3%] text-gray-900`}>
              Holding company
            </Text>
          </View>
          <View>
            <Text style={tw`text-xl mx-auto text-black`}>
              Foydalanuvchilarni ro`yxatdan o`tkazish
            </Text>
            <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>Name</Text>
            <Input placeH={'name'} onChangeText={setName} value={name} />
            <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>
              Password
            </Text>
            <Input
              placeH={'password'}
              onChangeText={setPassword}
              value={password}
            />
            <Text style={tw`pl-10 mt-10 text-lg text-gray-900`}>
              Phone number
            </Text>
            <Input placeH={'phone'} onChangeText={setPhone} value={phone} />

            <View style={tw`flex-row h-25 w-9/12 mx-auto my-5 justify-around`}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setRoleListModalVisible(true)}
                style={[
                  tw`h-full w-5.5/12 bg-white rounded-lg`,
                  {
                    shadowColor: '#000',
                    shadowOpacity: 0.4,
                    shadowRadius: 5,
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    elevation: 3,
                  },
                ]}>
                {roleId ? (
                  <Text style={tw`m-auto text-lg italic text-black`}>
                    {convertRoleName(
                      allRoleList.find(item => item.id === roleId).role,
                    )}
                  </Text>
                ) : (
                  <Text
                    style={tw`m-auto text-lg ${
                      roleId ? 'italic' : null
                    } text-black`}>
                    Rol tanlang
                  </Text>
                )}
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={roleListModalVisible}
                  onRequestClose={() => {
                    setRoleListModalVisible(!roleListModalVisible);
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      setRoleListModalVisible(!roleListModalVisible)
                    }
                    activeOpacity={0.95}
                    style={tw`flex-1 bg-[rgba(0,0,0,0.4)]`}>
                    <View style={tw`w-10/12 h-50 bg-white m-auto rounded-xl`}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={allRoleList}
                        renderItem={renderRoleList}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </TouchableOpacity>

              {Number(roleId) === 4 && (
                <TouchableOpacity
                  onPress={() => setMagazineListModalVisible(true)}
                  style={[
                    tw`h-full w-5.5/12 bg-white rounded-lg`,
                    {
                      shadowColor: '#000',
                      shadowOpacity: 0.4,
                      shadowRadius: 5,
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      elevation: 3,
                    },
                  ]}>
                  {magazineId ? (
                    <Text style={tw`m-auto text-lg italic text-black`}>
                      {
                        allmagazineList.find(item => item.id === magazineId)
                          .name
                      }
                    </Text>
                  ) : (
                    <Text style={tw`m-auto text-base text-gray-500 italic`}>
                      Magazin tanlang
                    </Text>
                  )}
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={magazineListModalVisible}
                    onRequestClose={() => {
                      setMagazineListModalVisible(!magazineListModalVisible);
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        setMagazineListModalVisible(!magazineListModalVisible)
                      }
                      activeOpacity={0.95}
                      style={tw`flex-1 bg-[rgba(0,0,0,0.3)]`}>
                      <View style={tw`w-10/12 h-50 bg-white m-auto rounded-lg`}>
                        <FlatList
                          data={allmagazineList}
                          renderItem={renderMagazineLis}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </TouchableOpacity>
              )}
            </View>

            {Number(roleId) === 7 ? (
              <>
                <Text style={tw`pl-10 mt-10 mb-1 text-lg text-gray-900`}>
                  Salon nomi
                </Text>
                <Input
                  placeH={'salon name'}
                  onChangeText={setSalonNomi}
                  value={salonNomi}
                />
              </>
            ) : null}
            <TouchableOpacity
              onPress={sendRegister}
              style={tw`w-5/12 h-12 bg-black mx-auto my-5 rounded-2xl`}>
              <Text style={tw`m-auto text-white text-lg font-semibold`}>
                Saqlash
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={tw`mx-auto mb-5`}>
              <Text style={tw`text-[#5199FF] font-semibold text-lg`}>
                Akkauntingiz bormi?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterResidenceScreen;
