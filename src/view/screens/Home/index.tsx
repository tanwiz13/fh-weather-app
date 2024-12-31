import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { ParamListBase, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import RNPickerSelect from 'react-native-picker-select';
import { connect, useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchLocations } from '../../../../shared/redux/thunk/home';
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
  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [searchText, setSearchText] = useState('');
  const [forecastDays, setForecastDays] = useState(1);
  const debouncedSearch = useDebounce(searchText, 350);

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const onClear = () => {
    setSearchText('');
  };

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      dispatch(fetchLocations(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  const renderEmptyHistory = () => {
    if (searchText && locations.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>No results found</Text>
        </View>
      );
    }
    return null;
  };

  const renderItem = ({item}: {item: any}) => {
    console.log('>>>>>>item', item);
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 8,
          padding: 16,
        }}
        onPress={() => {
          dispatch(fetchCurrentWeather(item?.url));
          onClear();
        }}
      >
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
        <Text>{item.region}</Text>
      </TouchableOpacity>
    );
  };

  if (showLoader) {
    return <ActivityIndicator style={{alignSelf: 'center', flex:1}} animating={showLoader} />;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onSearch={onSearch} onClear={onClear} />
      {searchText.length > 0 ? <FlatList
        data={locations}
        extraData={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={{width: '100%'}}
        ListEmptyComponent={renderEmptyHistory}
      /> : city && city.location ? (
        <View style={{width: '100%', flex: 1, height: '100%'}}>
          <ListResult city={city} forecastDays={forecastDays} setForecastDays={setForecastDays} forecast={forecast} />
        </View>
      ) : (
        renderEmptyHistory()
      )}
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
});

