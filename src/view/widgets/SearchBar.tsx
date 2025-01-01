import React, { useState }  from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { TYPOGRAPHY } from '../styles/typography';
import IcSearch from '../assets/icSearch';
import IcClose from '../assets/icClose';

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onSearch: Function;
  onClear: Function;
};

export const SearchBar = ({
    placeholder = 'Search cities',
    value,
    onSearch,
    onClear,
  }: SearchBarProps) => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.searchContainer,
        isFocused ? styles.focusedContainer : {},
      ]}>
      <View style={styles.searchIcon}>
        <IcSearch />
      </View>
      <TextInput
        value={value}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onEndEditing={() => {
          setIsFocused(false);
          Keyboard.dismiss();
        }}
        onBlur={() => {
          setIsFocused(false);
          Keyboard.dismiss();
        }}
        placeholderTextColor={TYPOGRAPHY.COLOR.DescriptionText}
        style={styles.searchInput}
        onChangeText={(text: string) => onSearch(text)}
      />

      {value?.length > 0 && (
        <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={() => onClear()}>
          <IcClose
            width={13}
            height={13}
            color={TYPOGRAPHY.COLOR.DescriptionText}
            strokeWidth={1.5}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  searchContainer: {
    borderWidth: 1,
    borderRadius: 32,
    borderColor: TYPOGRAPHY.COLOR.Iron,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  focusedContainer: {
    borderColor: TYPOGRAPHY.COLOR.TextPrimary,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 8,
    width: '80%',
    height: 44,
    fontSize: 14,
    color: TYPOGRAPHY.COLOR.DescriptionText,
  },
});
