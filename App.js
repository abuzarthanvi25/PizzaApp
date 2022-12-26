import * as React from 'react';
import NavigationRoot from './config/NavigationRoot';
import {Provider} from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationRoot />
    </Provider>
  );
}

export default App;
