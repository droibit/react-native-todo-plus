/// <reference path="../typings/main.d.ts" />

/* @flow */
'use strict';

import Header from './component/header';
import MainSection from './component/main-section';
import Toolbar from './component/toolbar';
import TodoStore from './store/todo-store';
import constants from './constant/todo-constants'
import React, {
  Component,
  StyleSheet,
  View,
  StatusBar,
  ListView,
  ToastAndroid,
} from 'react-native';

type Event = {
  type?: string,
  deleted?: boolean
};

export default class TodoApp extends Component {
  //noinspection JSDuplicatedDeclaration
  state: {
    todos: ListView.DataSource;
  };
  
  constructor(props) {
    super(props);

    this.state = {
      todos: new ListView.DataSource({
        rowHasChanged: (lhs, rhs) => lhs !== rhs
      })
    }
  }

  componentDidMount() {
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.getTodos())
    });
    TodoStore.addChangeListener((event: ?Event) => this._onChanged(event));
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener((event: ?Event) => this._onChanged(event));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#455A64'} />
        <Toolbar />
        <Header />
        <MainSection todos={this.state.todos} />
      </View>
    );
  }

  _onChanged(event?: Event) {
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.getTodos())
    });
    console.log("Called TodoApp#_onChanged");

    // TODO: Refactoring
    if (typeof event !== "undefined" &&
        event.type === constants.TODO_CLEAR_IF_COMPLETED) {
      this._showCompletedToast(event);
    }
  }

  _showCompletedToast(event: Event) {
    if (event.deleted) {
      ToastAndroid.show("Clear completed TODO", ToastAndroid.SHORT);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});