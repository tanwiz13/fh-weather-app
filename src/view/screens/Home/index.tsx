import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { fetchLocations } from '../../../../shared/redux/thunk/home';
import { AppDispatch } from '../../../../shared/redux/store';
import { SearchBar } from '../../widgets/SearchBar';
import { RootState } from '../../../../shared/redux/reducers';
import useDebounce from '../../../../shared/hooks/useDebounce';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function Home({locations}: {locations: any[]}) {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [searchText, setSearchText] = useState('');
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
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('CityDetail', { selectedCity: item });
      }}>
        <Text>{item.name} city</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onSearch={onSearch} onClear={onClear} />
      <FlatList
        data={locations}
        extraData={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyHistory}
      />
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    locations: state.home.locations,
  };
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    height:'100%',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 16,
  },
  separator: { marginBottom: 16 },
});

