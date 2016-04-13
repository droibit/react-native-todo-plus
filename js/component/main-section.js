/// <reference path="../typings/main.d.ts" />

'use strict';

import TodoItem from './todo-item'
import React, {
  Component,
  StyleSheet,
  View,
  ListView,
} from 'react-native';

export default class MainSection extends Component {
  
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});