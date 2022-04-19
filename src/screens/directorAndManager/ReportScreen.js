import {View, Text, ScrollView, Alert, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import Header from '../../components/global/Header';
import DoubleBtn from '../../components/global/DoubleBtn';
import axios from 'axios';
import {mainUrl} from '../../config/apiUrl';

const ReportScreen = () => {
  const [reportList, setReportList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getDailyReports = async () => {
    axios({
      url: `${mainUrl}lastoria/orders-report-all/`,
      method: 'get',
    })
      .then(res => {
        setRefreshing(false);
        setReportList(res.data);
        console.warn(res.data);
      })
      .catch(() => {
        setRefreshing(false);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  useEffect(() => {
    getDailyReports();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Header headerName={'Otchet'} />

      <DoubleBtn firstBtnName={'Buyurtmalar'} secondBtnName={'Xarajatlar'} />

      {/* map reportList with FlatList */}
      <FlatList
        data={reportList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={tw`flex-row justify-between items-center p-3 border w-11.5/12 border-gray-500 mx-auto my-2`}>
            <View>
              <Text>Umumiy</Text>
              <Text style={tw`text-xl`}>{item.total_price}</Text>
            </View>

            <View>
              <Text>Sum</Text>
              <Text style={tw`text-xl`}>{item.sum}</Text>
            </View>

            <View>
              <Text>Dollar</Text>
              <Text style={tw`text-xl`}>{item.dollar}</Text>
            </View>

            <View>
              <Text>Sana</Text>
              <Text style={tw`text-xl`}>{item.date_created}</Text>
            </View>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => {
          getDailyReports();
        }}
      />
    </ScrollView>
  );
};

export default ReportScreen;
