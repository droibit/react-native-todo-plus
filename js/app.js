/// <reference path="../typings/main.d.ts" />

'use strict';

import React, {Component, View, ListViewDataSource} from 'react-native';
import TodoStore from './store/todo-store'
import Header from './component/header';
import MainSection from './component/main-section';

export default class TodoApp extends Component {

  constructor(props) {
    super(props);

    this.state.todos = new ListViewDataSource({
      rowHasChanged: (lhs, rhs) => lhs !== rhs,
    });
  }

  componentDidMount() {
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.todos),
    });
    TodoStore.addChangeListener(this._onChanged);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChanged);
  }
  
  render() {
    return (
      <View>
        <Header />
        <MainSection todos={this.state.todos} />
      </View>
    );
  }

  _onChanged() {
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.todos),
    });
  }
} 