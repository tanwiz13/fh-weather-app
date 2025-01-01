import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/view/screens/Home';
import { Provider, useSelector } from 'react-redux';
import store from './shared/redux/store';
import Detail from './src/view/screens/Detail';
import useNetworkDetector from './shared/hooks/useNetworkDetector';
import { RootState } from './shared/redux/reducers';

const Stack = createNativeStackNavigator();


function NetworkAwareApp() {
  useNetworkDetector();
  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  if (!isConnected) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Please check your internet connection!</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NetworkAwareApp />
    </Provider>
  );
}
