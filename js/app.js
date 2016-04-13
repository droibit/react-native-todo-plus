/// <reference path="../typings/main.d.ts" />

'use strict';

import Header from './component/header';
import MainSection from './component/main-section';
import TodoStore from './store/todo-store'
import React, {
  Component,
  StyleSheet,
  View,
  ToolbarAndroid,
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
      todos: this.state.todos.cloneWithRows(TodoStore.getMockTodos(15)),
    });
    TodoStore.addChangeListener(()=>this._onChanged());
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(()=>this._onChanged());
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title={`React Native Todo`}
          titleColor={`#FFFFFF`}
          style={styles.toolbar}
        />
        <Header />
        <MainSection todos={this.state.todos} />
      </View>
    );
  }

  _onChanged() {
    console.log("Called TodoApp#_onChanged");
    this.setState({
      todos: this.state.todos.cloneWithRows(TodoStore.getTodos()),
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: `#607D8B`,
    height: 56,
  },
});