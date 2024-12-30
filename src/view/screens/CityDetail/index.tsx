import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { connect, useDispatch } from 'react-redux';
import { fetchCurrentWeather } from '../../../../shared/redux/thunk/home';
import { AppDispatch } from '../../../../shared/redux/store';
import { RootState } from '../../../../shared/redux/reducers';

function CityDetail({route, city, showLoader}: {route: any; city: any; showLoader: boolean}) {
  const dispatch = useDispatch<AppDispatch>();
  const [forecastDays, setForecastDays] = useState(1);

  const { selectedCity } = route.params;

  console.log('>>>>>>>>>city', city);
  console.log('>>>>>>>>selectedCity', selectedCity);

  useEffect(() => {
    console.log('>>>>>>>>in useffect', showLoader);
    if (selectedCity?.url && !city.current) {
      dispatch(fetchCurrentWeather(selectedCity.url));
    }
  }, [city, dispatch, selectedCity.url, showLoader]);

  console.log('>>>>>>>>showLoader', showLoader);

  if (showLoader || !city || !city.location || !city.current) {
    return <ActivityIndicator style={{alignSelf: 'center', flex:1}} animating={showLoader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Location</Text>
        <Text style={styles.text}>{city.location.name}, {city.location.region}</Text>
        <Text style={styles.text}>{city.location.country}</Text>
        <Text style={styles.text}>Local Time: {city.location.localtime}</Text>

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
                console.log('>>>>>>.done forecast days', forecastDays)
                // setForecastDays(value)
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
      </View>


      {/* Current Weather Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Current Weather</Text>
        <Image
          source={{ uri: `https:${city.current.condition.icon}` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.text}>Condition: {city.current.condition.text}</Text>
        <Text style={styles.text}>Temperature: {city.current.temp_c}°C / {city.current.temp_f}°F</Text>
        <Text style={styles.text}>Feels Like: {city.current.feelslike_c}°C / {city.current.feelslike_f}°F</Text>
        <Text style={styles.text}>Wind: {city.current.wind_mph} mph ({city.current.wind_kph} kph) {city.current.wind_dir}</Text>
        <Text style={styles.text}>Humidity: {city.current.humidity}%</Text>
        <Text style={styles.text}>Cloud Cover: {city.current.cloud}%</Text>
      </View>

      {/* Additional Weather Details Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Additional Details</Text>
        <Text style={styles.text}>Pressure: {city.current.pressure_mb} mb / {city.current.pressure_in} in</Text>
        <Text style={styles.text}>Precipitation: {city.current.precip_mm} mm / {city.current.precip_in} in</Text>
        <Text style={styles.text}>Visibility: {city.current.vis_km} km / {city.current.vis_miles} miles</Text>
        <Text style={styles.text}>Dew Point: {city.current.dewpoint_c}°C / {city.current.dewpoint_f}°F</Text>
        <Text style={styles.text}>UV Index: {city.current.uv}</Text>
        <Text style={styles.text}>Gusts: {city.current.gust_mph} mph / {city.current.gust_kph} kph</Text>
      </View>
    </ScrollView>
  );
}

function mapStateToProps(state: RootState) {
  return {
    city: state.home.city,
    showLoader: state.home.showLoader,
  };
}

export default connect(mapStateToProps)(CityDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  section: {
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
    width: 64,
    height: 64,
    marginBottom: 8,
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
});

