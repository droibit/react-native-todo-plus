/// <reference path="../typings/main.d.ts" />

/* @flow */
'use strict';

import TodoItem from './todo-item'
import React, {
  Component,
  StyleSheet,
  PropTypes,
  View,
  ListView,
  ListViewDataSource
} from 'react-native';

export default class MainSection extends Component {
  //noinspection JSDuplicatedDeclaration
  props: {
    todos: ListViewDataSource;
  };
  
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.props.todos}
          renderRow={(rowData) => <TodoItem todo={rowData} />}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          showsVerticalScrollIndicator={true}
          enableEmptySections={true}
          />
      </View>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.instanceOf(ListViewDataSource)
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});