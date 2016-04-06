/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {AppRegistry, Component} from 'react-native';
import TodoApp from './js/app';

class ReactNativeTodoPlus extends Component {
  render() {
    return (
      <TodoApp />
    );
  }
}

AppRegistry.registerComponent('ReactNativeTodoPlus', () => ReactNativeTodoPlus);
