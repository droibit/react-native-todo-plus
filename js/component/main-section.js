/// <reference path="../typings/main.d.ts" />

'use strict';

import React, {
  Component,
  ReactPropTypes,
  View,
  ListView
} from 'react-native';
import TodoItem from './todo-item'

export default class MainSection extends Component {

  static get propTypes() {
    return {
      // todos: ReactPropTypes.object.isRequired,
    }
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.props.todos}
          renderRow={(rowData) => <TodoItem todo={rowData} />}
          />
      </View>
    );
  }
}