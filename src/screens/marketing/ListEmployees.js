import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';
import {useSelector} from 'react-redux';
import Header from '../../components/global/Header';
import ThreeBtn from '../../components/global/ThreeBtn';

import tw from 'twrnc';

const ListEmployees = () => {
  const {token, role} = useSelector(state => state.userReducer);

  const [employees, setEmployees] = useState([]);

  //   const getEmployees = async () => {
  //     const employees = await axios.get(mainUrl + 'dashboard/workers/list/', {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });

  //     console.warn(employees.data);
  //   };

  useEffect(() => {
    axios
      .get(mainUrl + 'dashboard/workers/list/', {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(res => {
        console.warn(res.data);
        setEmployees(res.data);
      })
      .catch(err => {
        console.error('error', err);
      });
  }, [token]);

  return (
    <SafeAreaView>
      {/* <Text>ListEmployees</Text> */}
      <Header headerName={'Marketing'} />
      <ThreeBtn
        firstBtnName={'LaStoria'}
        firstBtnNavigation={() =>
          axios
            .get(mainUrl + 'dashboard/workers/list/?search=LaStoria', {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .then(res => {
              console.error(res.data);
              setEmployees(res.data);
            })
            .catch(err => {
              console.error('error', err);
            })
        }
        secondBtnName={'1SONiA'}
        secondBtnNavigation={() =>
          axios
            .get(mainUrl + 'dashboard/workers/list/?search=1SONiA', {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .then(res => {
              console.error(res.data);
              setEmployees(res.data);
            })
            .catch(err => {
              console.error('error', err);
            })
        }
        thirdBtnName={'TexnoStyle'}
        thirdBtnNavigation={() =>
          axios
            .get(mainUrl + 'dashboard/workers/list/?search=TexnoStyle', {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .then(res => {
              //   console.error(res.data);
              setEmployees(res.data);
            })
            .catch(err => {
              //   console.error('error', err);
              Alert.alert('Bazada xatolik Azimdan so`rang!');
              console.error('error', err);
            })
        }
      />
      <View style={tw`pb-[${Dimensions.get('screen').height / 4}px]`}>
        <FlatList
          data={employees}
          renderItem={({item}) => (
            <View style={tw`w-11/12 h-18 border mx-auto my-2`}>
              <Text>{item.first_name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListEmployees;
