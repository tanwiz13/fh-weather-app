import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { fetchCurrentWeather, fetchForecast, fetchLocations } from '../../../../shared/redux/thunk/home';
import { AppDispatch } from '../../../../shared/redux/store';
import { SearchBar } from '../../widgets/SearchBar';
import { RootState } from '../../../../shared/redux/reducers';
import useDebounce from '../../../../shared/hooks/useDebounce';
import { ListResult } from '../../widgets/ListResult';

interface HomeProps {
  locations: any[];
  city: any;
  showLoader: boolean;
  forecast: any
}

function Home({locations, city, showLoader, forecast}: HomeProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState<string>('');
  const [forecastDays, setForecastDays] = useState<number>(1);
  const debouncedSearch = useDebounce(searchText, 100);
  const pickerRef = useRef<any>(undefined);

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const onClear = () => {
    setSearchText('');
    setForecastDays(1);
  };

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      dispatch(fetchLocations(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  if (showLoader) {
    return <ActivityIndicator style={styles.loader} animating={showLoader} />;
  }

  const renderEmptyHistory = () => {
    if (searchText && locations.length === 0 && !showLoader) {
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No results found, please try with some other keyword.</Text>
        </View>
      );
    }
    return null;
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={styles.searchResult}
        onPress={() => {
          dispatch(fetchCurrentWeather(item?.url));
          onClear();
        }}
      >
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
        {item.region && <Text>{item.region}</Text>}
      </TouchableOpacity>
    );
  };

  const openPicker = () => {
    if (Platform.OS === 'android') {
      pickerRef && pickerRef?.current?.focus();
    } else {
      pickerRef && pickerRef?.current?.togglePicker(true);
    }
  };

  const renderResult = () => {
    return (
      <View style={styles.result}>
        <TouchableOpacity onPress={() => {openPicker();}} style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Forecast Days:</Text>
          <RNPickerSelect
            ref={Platform.OS === 'ios' ? pickerRef : null}
            pickerProps={{ ref: Platform.OS === 'android' ? pickerRef : null }}
            style={{
              inputIOS: {
                fontSize: 16,
                pointerEvents: 'none',
              },
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: 'grey',
                borderRadius: 8,
                color: 'black',
                width: 32,
              },
            }}
            onValueChange={(value) => {
              setForecastDays(value);
              dispatch(fetchForecast(city.location.name, value));
            }}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            value={forecastDays}
            items={[
              { label: '1', value: 1 },
              { label: '3', value: 3 },
              { label: '7', value: 7 },
            ]}
          />
        </TouchableOpacity>
        <ListResult city={city} forecast={forecast} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onSearch={onSearch} onClear={onClear} />
      {searchText.length > 0 ? (
        <FlatList
          data={locations}
          extraData={locations}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          style={styles.list}
          ListEmptyComponent={renderEmptyHistory}
        />) : (city && city.location) && (
          renderResult())
        }
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    locations: state.home.locations,
    city: state.home.city,
    showLoader: state.home.showLoader,
    forecast: state.home.forecast,
  };
}

export default connect(mapStateToProps)(Home);

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
  container: {
    flex: 1,
    padding: 16,
    height:'100%',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    width: '100%',
  },
  separator: { marginBottom: 16 },
  dropdownContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    padding: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  list: {width: '100%'},
  loader: {
    alignSelf: 'center',
    flex:1,
  },
  result: {
    width: '100%',
    flex: 1,
    height: '100%',
  },
  searchResult: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    width: '80%',
  },
});

