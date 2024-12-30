import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/view/screens/Home';
import { Provider } from 'react-redux';
import store from './shared/redux/store';
import CityDetail from './src/view/screens/CityDetail';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="CityDetail" component={CityDetail} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
