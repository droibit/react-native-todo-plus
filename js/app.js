/// <reference path="../typings/tsd.d.ts" />

'use strict';

import React, {Component, View} from 'react-native';
import Header from './component/header';
import MainSection from './component/main-section';

export default class TodoApp extends Component {
  
  render() {
    return (
      <View>
        <Header />
        <MainSection />
      </View>
    );
  }
} 