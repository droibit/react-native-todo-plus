/// <reference path="../typings/main.d.ts" />

'use strict';

import Header from './component/header';
import MainSection from './component/main-section';
import Toolbar from './component/toolbar';
import TodoStore from './store/todo-store';
import React, {
  Component,
  StyleSheet,
  View,
  StatusBar,
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
      todos: this.state.todos.cloneWithRows(TodoStore.getTodos()),
    });
    TodoStore.addChangeListener(()=>this._onChanged());
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(()=>this._onChanged());
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

  _onChanged() {
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.getTodos()),
    });
    console.log("Called TodoApp#_onChanged");
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});