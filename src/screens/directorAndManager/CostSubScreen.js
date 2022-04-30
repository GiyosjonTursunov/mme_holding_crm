import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import * as React from 'react';
import tw from 'twrnc';
import {PieChart} from 'react-native-svg-charts';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

const {useState, useEffect} = React;

const CostSubScreen = () => {
  const [companiesCosts, setCompaniesCosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getCompaniesCosts = async () => {
    setRefreshing(true);
    axios({
      url: `${mainUrl}dashboard/companies/statistics/costs/`,
      method: 'GET',
    })
      .then(res => {
        setCompaniesCosts(res.data);
        setRefreshing(false);
      })
      .catch(_err => {
        console.warn(_err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getCompaniesCosts();
  }, []);

  return (
    <ScrollView
      style={tw`bg-white flex-1`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getCompaniesCosts} />
      }>
      <View style={tw`mt-5`}>
        <PieChart
          style={{height: Dimensions.get('screen').height / 3}}
          data={companiesCosts}
        />
      </View>

      <View style={tw`mt-5`}>
        <FlatList
          horizontal
          data={companiesCosts}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => (
            <View
              style={tw`mx-${
                Dimensions.get('screen').width / 45
              } flex-col items-center justify-center`}>
              <Text>{item.name}</Text>
              <View style={tw`w-8 h-8 rounded-full bg-[${item.svg?.fill}]`} />
              <Text>{item.value}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default CostSubScreen;
