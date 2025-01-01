import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../../../../shared/redux/reducers';

function Detail({route, city}: {route: any; city: any;}) {
  const { data } = route.params;
  const { date, day, hour } = data;

  const renderCondition = (item: any) => {
    return (
      <View style={styles.hourContainer}>
        <Text style={styles.title}>{new Date(item.time).toLocaleTimeString()}</Text>
        <Image
          source={{ uri: `https:${item?.condition?.icon}` }}
          style={styles.icon}
        />
        <Text style={styles.tempText}>Condition: {day.condition.text}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{`${city.location.name}, ${city.location.region}, ${city.location.country}`}</Text>
        <Text style={styles.title}>{new Date(date).toDateString()}</Text>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 32}}>
          <Image
            source={{ uri: `https:${day?.condition?.icon}` }}
            style={styles.icon}
          />
          <View>
            <Text style={styles.tempText}>High: {day.maxtemp_c}°C</Text>
            <Text style={styles.tempText}>Low: {day.mintemp_c}°C</Text>
            <Text style={styles.tempText}>Condition: {day.condition.text}</Text>
          </View>
        </View>
      </View>
      {hour?.length > 0 &&
        <View style={styles.section}>
          <Text style={[styles.title, {marginTop: 8}]}>Hourly conditions</Text>
          <FlatList
            horizontal
            data={hour}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => renderCondition(item)}
            contentContainerStyle={styles.listContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
    </ScrollView>
  );
}

function mapStateToProps(state: RootState) {
  return {
    city: state.home.city,
  };
}

export default connect(mapStateToProps)(Detail);

const styles = StyleSheet.create({
  icon: {
    width: 64,
    height: 64,
  },
  tempText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
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
  hourContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  listContainer: {
    marginVertical: 16,
  },
});

