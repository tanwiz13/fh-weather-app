import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ForecastCardProps {
  data: any;
};

export const ForecastCard = ({data}: ForecastCardProps) => {
  const {day, date} = data;
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `https:${day?.condition?.icon}` }}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
          <Text style={styles.dateText}>Date: {new Date(date).toDateString()}</Text>
          <Text style={styles.tempText}>High: {day.maxtemp_c}°C</Text>
          <Text style={styles.tempText}>Low: {day.mintemp_c}°C</Text>
          <Text style={styles.tempText}>Condition: {day.condition.text}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  icon: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  tempText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
});
