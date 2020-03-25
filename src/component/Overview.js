import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import {colors} from '../theme';
import images from '../images';
import {transformMoneyUnit} from '../util';

/**
 * Components that outline individual cryptocurrency
 * @param {*} props
 */

const Overview = (props) => {
  const {id, name, symbol, price, dayDiff, weekDiff, handlePress} = props;
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <View>
              <Image style={styles.image} source={images[id]} />
            </View>
            <View style={[styles.row, {padding: 5, paddingLeft: 20}]}>
              <Text style={[styles.topText, styles.highlightText]}>
                {`${symbol} | `}
              </Text>
              <Text style={styles.topText}>{name}</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.topText, styles.highlightText, {padding: 5}]}>
              {`${transformMoneyUnit(price)} ₩`}
            </Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Text style={styles.bottomText}>24h:</Text>
            <Text
              style={[
                styles.bottomText,
                styles.highlightText,
                dayDiff > 0 ? styles.blueText : styles.redText,
              ]}>
              {` ${dayDiff} %`}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.bottomText}>7d:</Text>
            <Text
              style={[
                styles.bottomText,
                styles.highlightText,
                weekDiff > 0 ? styles.blueText : styles.redText,
              ]}>{` ${weekDiff} %`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Overview.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dayDiff: PropTypes.number.isRequired,
  weekDiff: PropTypes.number.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: colors.grey,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.blurGrey,
  },
  topLeft: {
    flexDirection: 'row',
  },
  image: {
    width: 32,
    height: 32,
  },
  highlightText: {
    fontWeight: 'bold',
  },
  topText: {
    fontSize: 16,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  bottomText: {},
  redText: {
    color: colors.red,
  },
  blueText: {
    color: colors.blue,
  },
});

export default Overview;
