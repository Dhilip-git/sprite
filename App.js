/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';

import StateView from './View/StateView.js';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StateView />
    </View>
  );
};

export default App;
