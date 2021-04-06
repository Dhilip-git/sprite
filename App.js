/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Home from './screen/HomeScreen'

const App = () => {
  return (
    <View style={{flex:1}}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
