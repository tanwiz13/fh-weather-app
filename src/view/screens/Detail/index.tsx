import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { connect, useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchForecast } from '../../../../shared/redux/thunk/home';
import { AppDispatch } from '../../../../shared/redux/store';
import { RootState } from '../../../../shared/redux/reducers';

function Detail({route, city, showLoader}: {route: any; city: any; showLoader: boolean}) {


  return (
    <ScrollView style={styles.container}>
      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Location</Text>
        {/* <Text style={styles.text}>{city.location.name}, {city.location.region}</Text>
        <Text style={styles.text}>{city.location.country}</Text>
        <Text style={styles.text}>Local Time: {city.location.localtime}</Text> */}
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

export default connect(mapStateToProps)(Detail);

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

