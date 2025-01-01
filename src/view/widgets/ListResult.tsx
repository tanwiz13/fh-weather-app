import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ForecastCard } from './ForecastCard';

interface ListResultCardProps {
  city: any;
  forecast: any;
};

export const ListResult = ({city, forecast}: ListResultCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const renderForecastItem = (day: any) => {
    return <ForecastCard data={day} onCardPress={() => {navigation.navigate('Detail', {data: day});}}/>;
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Current Weather</Text>
        <View style={styles.location}>
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
    );
  };


  return (
    <View>
      {forecast &&
      <View style={styles.section}>
        <FlatList
          data={forecast}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => renderForecastItem(item)}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </View>}
    </View>
  );
};

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
  listContainer: {},
  header: {
    width: '100%',
    marginBottom: 24,
    // padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

