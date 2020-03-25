import React, {useState} from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import _ from 'lodash';
import {CandleStickChart} from 'react-native-charts-wrapper';

const CandleStickChartScreen = ({data}) => {
  const legend = {
    enabled: true,
    textSize: 14,
    form: 'CIRCLE',
    wordWrapEnabled: true,
  };
  const marker = {
    enabled: true,
    markerColor: processColor('#2c3e50'),
    textColor: processColor('white'),
  };
 
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleSelect = ({nativeEvent}) => {
    if (nativeEvent == null) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry(JSON.stringify(nativeEvent));
    }
    console.log(nativeEvent);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 80}}>
        <Text> selected entry</Text>
        <Text> {selectedEntry}</Text>
      </View>
      <View style={styles.container}>
        <CandleStickChart
          style={styles.chart}
          data={data}
          marker={marker}
          chartDescription={{text: 'CandleStick'}}
          legend={legend}
          xAxis={xAxis}
          yAxis={yAxis}
          maxVisibleValueCount={16}
          autoScaleMinMaxEnabled={true}
          // zoom={{scaleX: 2, scaleY: 1, xValue:  400000, yValue: 1}}
          zoom={{
            scaleX: 15.41,
            scaleY: 1,
            xValue: 40,
            yValue: 916,
            axisDependency: 'LEFT',
          }}
          onSelect={handleSelect}
          onChange={({nativeEvent}) => console.log(nativeEvent)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});

export default CandleStickChartScreen;
