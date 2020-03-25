import React, {useState, useEffect} from 'react';
import {View, ActivityIndicatorProps, processColor} from 'react-native';
import {withMappedNavigationParams} from 'react-navigation-props-mapper';
import axios from 'axios';

import CandleStickChartScreen from './CandleStickChartScreen';
import {apiKey} from '../../config';

/*

time_period: daily, hourly (데이터 내에서 open,close간의 차이)
interval :
"hourly""daily""weekly""monthly""yearly""1h""2h""3h""4h""6h""12h""1d""2d""3d""7d""14d""15d""30d""60d""90d""365d"
2019-08-17T00:04:01.000Z ~ 2019-08-30T18:49:02.000Z.
(데이터 open간의 시간 간격)

(time_period,interval) 가능한 조합
daily, daily
hourly, 1h
              2h
              3h
              4h
              6h
              12h
*/

const DetailScreen = ({id}) => {
  const dataSets = {
    label: 'AAPL',
    config: {
      highlightColor: processColor('darkgray'),
      shadowColor: processColor('black'),
      shadowWidth: 1,
      shadowColorSameAsCandle: true,
      increasingColor: processColor('#71BD6A'),
      increasingPaintStyle: 'FILL',
      decreasingColor: processColor('#D14B5A'),
    },
  };

  const [values, setValues] = useState([]);
  const [option, setOption] = useState({
    period: 'daily',
    interval: 'daily',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          url:
            'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical',
          method: 'get',
          headers: {'X-CMC_PRO_API_KEY': apiKey},
          params: {
            id,
            time_period: option.period,
            interval: option.interval,
            time_start: '2019-08-18',
            time_end: '2019-08-29',
            convert: 'KRW',
          },
        };
        const {
          data: {
            data: {quotes},
          },
        } = await axios(requestOptions);
        const arr = quotes.map((value) => {
          /*
          value :{
        "time_open": "2019-08-18T01:00:00.000Z",
        "time_close": "2019-08-18T01:59:59.999Z",
        "quote": {
          "KRW": {
            "open": 12372856.342203882,
            "high": 12379093.95220612,
            "low": 12307918.170877062,
            "close": 12325581.560967147,
            "volume": null,
            "market_cap": 220410819473278.47,
            "timestamp": "2019-08-18T01:59:10.000Z"
          }
        }
      }
          */
          return {
            x: value.time_open,
            shadowH: value.quote.KRW.high,
            shadowL: value.quote.KRW.low,
            open: value.quote.KRW.open,
            close: value.quote.KRW.close,
          };
        });
        console.log(arr);
        setValues(arr);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [option]);

  /**
   * Merge data for react-native-charts-wrappe library
   */

  const mergeData = () => {
    return {
      dataSets: [{...dataSets, values}],
    };
  };

  const xAxis = {
    $set: {
      drawLabels: true,
      drawGridLines: true,
      position: 'BOTTOM',
      yOffset: 5,
      limitLines: _.times(data.dataSets[0].values.length / 5, (i) => {
        return {
          limit: 5 * (i + 1) + 0.5,
          lineColor: processColor('darkgray'),
          lineWidth: 1,
          label: (i + 1).toString(),
        };
      }),
    },
  };
  const yAxis = {
    $set: {
      left: {
        valueFormatter: '₩ #',
        limitLines: [
          {
            limit: 112.4,
            lineColor: processColor('red'),
            lineDashPhase: 2,
            lineDashLengths: [10, 20],
          },
          {
            limit: 89.47,
            lineColor: processColor('red'),
            lineDashPhase: 2,
            lineDashLengths: [10, 20],
          },
        ],
      },
      right: {
        enabled: false,
      },
    },
  };

  return (
    <View>
      <CandleStickChartScreen data={mergeData()} xAxis={} yAxis={}/>
    </View>
  );
};

DetailScreen.navigationOptions = {};

export default withMappedNavigationParams()(DetailScreen);
