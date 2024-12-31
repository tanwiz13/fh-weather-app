import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ForecastCard } from './ForecastCard';

interface ListResultCardProps {
  city: any;
  forecastDays: number;
  setForecastDays: Function
  forecast: any;
};

export const ListResult = ({city, forecastDays, setForecastDays, forecast}: ListResultCardProps) => {
  // const [forecastDays, setForecastDays] = useState(1);
  console.log('>>>>>>>forecast in list result', forecast);

  const renderForecastItem = (day: any) => {
    return <ForecastCard data={day}/>;
  };

  return (
    <View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Forecast Days:</Text>
        <RNPickerSelect
          style={{ inputIOSContainer: { pointerEvents: 'none' } }}
          onValueChange={(value) => {
            setForecastDays(value);
          }}
          placeholder={{}}
          useNativeAndroidPickerStyle
          onDonePress={() => {console.log('>>>>>>.done forecast days', forecastDays);}}
          onClose={(donePressed: boolean) => {
            if (donePressed) {
              console.log('>>>>>>.done forecast days', forecastDays);
            }
          }}
          value={forecastDays}
          items={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ]}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Current Weather</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.text}>{`${city.location.name}, ${city.location.region}, ${city.location.country}`}</Text>
            <Text style={styles.text}>{new Date(city.location.localtime).toDateString()}</Text>
            <Text style={styles.text}>Condition: {city.current.condition.text}</Text>
            <Text style={styles.text}>Temperature: {city.current.temp_c}°C / {city.current.temp_f}°F</Text>
            <Text style={styles.text}>Feels Like: {city.current.feelslike_c}°C / {city.current.feelslike_f}°F</Text>
          </View>
          <Image
            source={{ uri: `https:${city.current.condition.icon}` }}
            style={styles.weatherIcon}
          />
        </View>
      </View>

      {forecast &&
      <View style={styles.section}>
        <Text style={styles.title}>Forecast</Text>
        <FlatList
          data={forecast}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => renderForecastItem(item)}
          contentContainerStyle={styles.listContainer}
        />
      </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 4,
  },
  weatherIcon: {
    width: 128,
    height: 128,
  },
  dropdownContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  picker: {
    height: 40,
    color: '#333',
  },
  listContainer: {
    // padding: 16,
    backgroundColor: '#f8f9fa',
  },
});

