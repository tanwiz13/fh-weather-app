import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchLocations } from '../../../../shared/redux/thunk/home';
import { AppDispatch } from '../../../../shared/redux/store';
import { SearchBar } from '../../widgets/SearchBar';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');

  const onSearch = (text: string) => {
    setSearchText(text);
    console.log('>>>>>>text',text);
    dispatch(fetchLocations(text));
  };

  const onClear = () => {
    setSearchText('');
  };

  useEffect(() => {
    dispatch(fetchCurrentWeather('Paris'));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onSearch={onSearch} onClear={onClear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    height:'100%',
    alignItems: 'center',
  },
});

