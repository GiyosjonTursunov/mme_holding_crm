import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  RefreshControl,
  Pressable,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';

const {useState, useEffect} = React;
import {mainUrl} from '../../config/apiUrl';

const UseProduct = () => {
  const [product_id, setProduct_id] = useState('');
  const [product_count, setProduct_count] = useState('');
  const [note, setNote] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(false);
  const [product_name, setProduct_name] = useState('');
  const [selected_product_count, setSelected_product_count] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const use_product = () => {
    if (Number(product_id) && Number(product_count) && note) {
      if (selected_product_count - Number(product_count) >= 0) {
        let dataUseProduct = {
          count: product_count,
          note: note,
          product: product_id,
          isused: true,
        };
        AsyncStorage.getItem('@user')
          .then(stringJson => {
            axios({
              url: `${mainUrl}lastoria/warehouse/`,
              method: 'POST',
              data: dataUseProduct,
              headers: {
                Authorization: `token ${JSON.parse(stringJson).token}`,
              },
            })
              .then(res => {
                console.warn(res.data);
                setProduct_count('');
                setNote('');
                setProduct_id('');
              })
              .catch(err => {
                console.warn(err);
              });
          })
          .catch(err => {
            console.warn('err use_product => ', err);
          });
      } else {
        alert('Maxsulot yetmidi');
      }
    } else {
      alert("Ma'lumotni qayta tekshiring!");
    }
  };

  const Item = ({name, count, amount, id, image}) => (
    <TouchableOpacity
      onPress={() => {
        setProduct_id(id);
        setProduct_name(name);
        setSelected_product_count(count);
        setModalProduct(false);
      }}
      style={tw`w-11.5/12 h-15 border border-[rgba(0,0,0,0.5)] rounded-xl mx-auto mt-[1%] flex-row justify-center items-center`}>
      <View style={tw`w-15 h-full`}>
        {image ? (
          <Image
            source={{uri: mainUrl + image.substring(1)}}
            style={tw`w-13 h-13 rounded-md my-auto ml-2`}
          />
        ) : (
          <Image
            source={require('../../../assets/material.jpeg')}
            style={tw`w-13 h-13 my-auto ml-2`}
          />
        )}
      </View>
      <Text style={tw`w-5.5/12 text-base font-semibold ml-3`}>{name}</Text>
      <Text style={tw`w-2/12 text-base`}>{count}</Text>
      <Text style={tw`w-2/12`}>{amount ? 'metr' : 'dona'}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      count={item.count}
      amount={item.amount}
      id={item.id}
      image={item.img}
    />
  );

  const getAllProducts = () => {
    AsyncStorage.getItem('@user')
      .then(stringJson => {
        setRefreshing(true);
        axios({
          url: `${mainUrl}lastoria/product/`,
          method: 'GET',
          headers: {
            Authorization: `token ${JSON.parse(stringJson).token}`,
          },
        })
          .then(res => {
            console.warn(res.data);
            setAllProducts(res.data);
            setRefreshing(false);
          })
          .catch(err => {
            console.warn(err);
            setRefreshing(false);
          });
      })
      .catch(err => {
        console.warn('err getAllProducts => ', err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <TouchableOpacity
        onPress={() => setModalProduct(true)}
        style={tw`w-11/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-2xl mx-auto my-[1%] pl-2`}>
        <Text style={tw`my-auto text-[rgba(0,0,0,0.5)]`}>
          Maxsulot nomi:
          <Text style={tw`text-black text-base font-bold`}>
            {'  '}
            {product_name}
          </Text>
        </Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalProduct}
          onRequestClose={() => {
            setModalProduct(!modalProduct);
          }}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.7)]`}>
            <View
              style={tw`m-auto w-10.5/12 h-100 border rounded-3xl bg-white justify-start relative pt-5`}>
              <Pressable
                onPress={() => setModalProduct(false)}
                style={tw`absolute top-[-12px] right-0`}>
                <Image
                  source={require('../../../assets/x-button.png')}
                  style={tw`w-8 h-8`}
                />
              </Pressable>
              <FlatList
                data={allProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={getAllProducts}
                  />
                }
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>

      <TextInput
        value={product_count}
        onChangeText={setProduct_count}
        placeholder="Maxsulot soni"
        style={tw`w-11/12 h-11 border border-[rgba(0,0,0,0.5)] rounded-2xl mx-auto my-[1%] pl-2`}
      />
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Qo'shimcha ma'lumotar"
        multiline
        style={tw`w-11/12 h-25 rounded-2xl border mx-auto mt-[2%] border-[rgba(0,0,0,0.5)] p-3`}
      />
      <TouchableOpacity
        onPress={use_product}
        style={tw`w-6/12 h-15 bg-black mx-auto mt-5 rounded-full`}>
        <Text style={tw`text-white font-semibold m-auto text-lg`}>Saqlash</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UseProduct;
