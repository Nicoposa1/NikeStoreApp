/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Navigator} from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/store';
import { LoginScreen } from './src/screens/LoginScreen';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar />
      {/* <Navigator /> */}
      <LoginScreen />
    </Provider>
  );
}

export default App;
