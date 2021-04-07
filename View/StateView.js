import React from 'react';
import HomeScreen from '../screen/HomeScreen.js';
import {StateContextProvider} from '../context/state-context.js';

export default function StateView() {
  return (
    <StateContextProvider>
      <HomeScreen />
    </StateContextProvider>
  );
}
