import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import _ from 'lodash';

import Overview from './Overview';
import {apiKey} from '../../config';
import currencyList from '../currencyList';

const requestOptions = {
  url: 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  method: 'get',
  headers: {'X-CMC_PRO_API_KEY': apiKey},
  params: {id: currencyList.toString(), convert: 'KRW'},
};

/**
 * The screen that is first seen when the application is turned on.
 */

const HomeScreen = ({navigation: {navigate}}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {data: fetched},
        } = await axios(requestOptions);
        const arr = [];
        for (let prop in fetched) {
          if (!fetched.hasOwnProperty(prop)) continue;
          const item = fetched[prop];
          arr.push({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            price: _.round(item.quote.KRW.price),
            dayDiff: _.round(item.quote.KRW.percent_change_24h, 2),
            weekDiff: _.round(item.quote.KRW.percent_change_7d, 2),
          });
        }
        setData(arr);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /**
   * item to render in flatlist
   * @param {*} param0
   */

  const renderItem = ({item}) => {
    const {id, name, symbol, price, dayDiff, weekDiff} = item;
    return (
      <Overview
        id={id}
        name={name}
        symbol={symbol}
        price={price}
        dayDiff={dayDiff}
        weekDiff={weekDiff}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Cryptocurrency App',
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
