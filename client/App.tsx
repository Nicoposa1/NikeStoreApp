// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Navigator, { AuthenticatedUserProvider } from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <AuthenticatedUserProvider>
        <Navigator />
      </AuthenticatedUserProvider>
    </Provider>
  );
};

export default App;
