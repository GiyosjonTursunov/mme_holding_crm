/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import tw from 'twrnc';
import directorCController from '../../controllers/directorManager/create';
import directorGController from '../../controllers/directorManager/get';
import directorUController from '../../controllers/directorManager/update';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import {baseUrl, mainUrl} from '../../config/apiUrl';
import axios from 'axios';

const CostsRegister = () => {
  const [xarajatNomi, setXarajatNomi] = useState('');
  const [soni, setSoni] = useState('');
  const [narxi, setNarxi] = useState('');
  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [balance, setBalance] = useState('');
  const [qoldiq, setQoldiq] = useState('');
  const [serioProchi, setSerioProchi] = useState(true);

  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);

  const [current, setCurrent] = useState('');

  const dataCostsCreate = {
    name: xarajatNomi,
    number: Number(soni),
    amount: Number(current),
    price: Number(narxi),
    note: note,
    left_balance: qoldiq,
    company: Number(companyId),
    is_serio: serioProchi,
  };

  const dataCreateUpdateBalance = {
    add_balance: narxi,
    note: note,
  };

  const clearAllHooks = () => {
    setXarajatNomi('');
    setSoni('');
    setNarxi('');
    setNote('');
  };

  useEffect(() => {
    axios({
      url: `${mainUrl}dashboard/companies/`,
      method: 'GET',
    })
      .then(res => {
        setCompanies(res.data);
      })
      .catch(_err => {
        console.warn(_err);
      });
    directorGController.getBalance(setBalance, setQoldiq);
  }, []);

  const dataReport = {
    note: note,
  };

  const Item = ({img, id}) => (
    // <View>
    <TouchableOpacity
      onPress={() => setCompanyId(id)}
      style={[
        tw`w-20 h-20 m-auto mx-1 rounded-xl p-1 my-0.5`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 3,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 2,
          backgroundColor: `${id === companyId ? '#00ff00' : '#fff'}`,
        },
      ]}>
      <Image
        source={{uri: baseUrl + img}}
        resizeMode="contain"
        style={tw`w-full h-full`}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item img={item.img} id={item.id} />;

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Header headerName={'Xarajatlar'} />
      <DoubleBtn
        firstBtnName={'SERIO'}
        firstBtnFunction={() => setSerioProchi(true)}
        secondBtnName={'PROCHI'}
        secondBtnFunction={() => setSerioProchi(false)}
      />
      <View
        style={tw`w-9/12 h-10 flex-row justify-between items-center mx-auto`}>
        <Text style={tw`text-xl font-bold`}>Balans</Text>
        <View style={tw`flex-row w-6/12 justify-around items-center`}>
          <Text style={tw`text-xl font-bold`}>{balance ? balance : '0'}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../../assets/plus.png')}
              style={tw`m-auto w-8 h-8`}
            />
          </TouchableOpacity>
        </View>
      </View>

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
            style={tw`w-11/12 h-60 bg-white rounded-3xl justify-around items-center`}>
            <Text style={tw`text-base font-bold`}>Balansni to'ldirish</Text>
            <TextInput
              multiline
              style={tw`w-11/12 h-20 border border-[rgba(0,0,0,0.5)] rounded-2xl p-2`}
              placeholder="Qayerdan pul olindi?"
              value={note}
              onChangeText={setNote}
            />
            <TextInput
              style={tw`w-11/12 h-10 border rounded-2xl p-3 border-[rgba(0,0,0,0.5)]`}
              placeholder="Pul miqdori?"
              value={narxi}
              onChangeText={setNarxi}
            />
            <TouchableOpacity
              style={tw`w-6/12 h-13 rounded-full bg-[#242424]`}
              onPress={() => {
                directorCController.createUpdateBalance(
                  modalVisible,
                  narxi,
                  note,
                  dataCreateUpdateBalance,
                  setBalance,
                  setQoldiq,
                  setModalVisible,
                );
                clearAllHooks();
              }}>
              <Text style={tw`m-auto text-base font-semibold text-white`}>
                Qo'shish
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <View
        style={tw`w-9/12 h-10 flex-row justify-between items-center mx-auto`}>
        <Text style={tw`text-xl font-bold`}>Qoldiq</Text>
        <View style={tw`flex-row w-6/12 justify-around items-center`}>
          <Text style={tw`text-xl font-bold`}>{qoldiq ? qoldiq : '0'}</Text>
        </View>
      </View>

      <View style={tw`w-full justify-around`}>
        <TextInput
          placeholder="Xarajat nomi"
          style={tw`border w-10/12 my-2 mx-auto h-13 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
          onChangeText={setXarajatNomi}
          value={xarajatNomi}
        />
        <TextInput
          placeholder="Soni"
          style={tw`border w-10/12 my-2 mx-auto h-13 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
          onChangeText={setSoni}
          value={soni}
        />
        <View
          style={tw`flex-row my-2 justify-around items-center mx-auto h-13`}>
          <TouchableOpacity
            onPress={() => setCurrent(3)}
            // 1 bolsa dona 2 bolsa kg 3 bolsa metr
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Metr
              {current === 3 && '✅'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrent(1)}
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Dona
              {current === 1 && '✅'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrent(2)}
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Kg
              {current === 2 && '✅'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={tw`flex-row my-2 justify-around items-center mx-auto h-13`}>
          <TouchableOpacity
            onPress={() => setCurrent(4)}
            // 1 bolsa dona 2 bolsa kg 3 bolsa metr
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Litr
              {current === 4 && '✅'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrent(5)}
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Kub
              {current === 5 && '✅'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCurrent(6)}
            style={tw`w-3/12 h-full border rounded-lg mx-2 border-[rgba(0,0,0,0.5)]`}>
            <Text style={tw`m-auto`}>
              Kbayt/soat
              {current === 6 && '✅'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`my-1 mx-auto`}>
          <FlatList
            horizontal
            data={companies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        <TextInput
          placeholder="Xarajat narxi"
          style={tw`border w-10/12 my-2 h-13 mx-auto rounded-2xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
          value={narxi}
          onChangeText={setNarxi}
        />
        <TextInput
          placeholder="Qayerdan olingan…"
          multiline
          style={tw`border w-10/12 mx-auto h-30 rounded-xl pl-3 text-base border-[rgba(0,0,0,0.5)]`}
          value={note}
          onChangeText={setNote}
        />
        <View style={tw`flex-row w-60 mx-auto my-2 mb-10`}>
          <TouchableOpacity
            style={tw`w-5.5/12 h-11 bg-black mx-auto rounded-2xl`}
            onPress={() => {
              directorCController.sendCostCreate(
                dataCostsCreate,
                setQoldiq,
                qoldiq,
                clearAllHooks,
              );
            }}>
            <Text style={tw`m-auto text-white text-base`}>Ishlatish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-5.5/12 h-11 bg-black mx-auto rounded-2xl`}
            onPress={() => setModalReportVisible(true)}>
            <Text style={tw`m-auto text-white text-base`}>Tozalash</Text>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalReportVisible}
              onRequestClose={() => {
                setModalVisible(!modalReportVisible);
              }}>
              <TouchableOpacity
                onPress={() => setModalReportVisible(false)}
                style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
                <TouchableOpacity
                  onPress={() => setModalReportVisible(true)}
                  style={tw`w-11/12 h-40 bg-white rounded-3xl justify-around items-center`}>
                  <TextInput
                    multiline
                    style={tw`w-11/12 h-20 border border-[rgba(0,0,0,0.5)] rounded-2xl p-2`}
                    placeholder="Balans tozalsh"
                    value={note}
                    onChangeText={setNote}
                  />
                  <TouchableOpacity
                    style={tw`w-6/12 h-13 rounded-full bg-[#242424]`}
                    onPress={() =>
                      directorUController.ReportBalance(
                        note,
                        balance,
                        dataReport,
                        setBalance,
                        setQoldiq,
                        setModalReportVisible,
                      )
                    }>
                    <Text style={tw`m-auto text-base font-semibold text-white`}>
                      Qo'shish
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CostsRegister;
