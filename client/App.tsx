/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {ProductsScreen} from './src/screens/ProductsScreen';
import {ProductDetailsScreen} from './src/screens/ProductDetailsScreen';
import {ShoppingCartScreen} from './src/screens/ShoppingCartScreen';
import {Navigator} from './src/navigation';
import {Provider} from 'react-redux';
import { store } from './src/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <StatusBar />
        <Navigator />
      </View>
    </Provider>
  );
}

export default App;
