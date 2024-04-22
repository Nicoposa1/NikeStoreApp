/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {ProductsScreen} from './src/screens/ProductsScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <StatusBar />
      <ProductDetailsScreen />
    </View>
  );
}

export default App;
