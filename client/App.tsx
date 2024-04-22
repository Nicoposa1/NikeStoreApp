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

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <StatusBar />
      {/* <ProductDetailsScreen /> */}
      <ShoppingCartScreen />
    </View>
  );
}

export default App;
