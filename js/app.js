/// <reference path="../typings/main.d.ts" />

'use strict';

import TodoStore from './store/todo-store'
import Header from './component/header';
import MainSection from './component/main-section';
import React, {
  Component,
  View,
  ListView
} from 'react-native';

export default class TodoApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: new ListView.DataSource({
        rowHasChanged: (lhs, rhs) => lhs !== rhs,
      }),
    }
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