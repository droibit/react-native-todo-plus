/// <reference path="../typings/main.d.ts" />

'use strict';

import TodoItem from './todo-item'
import React, {
  Component,
  ReactPropTypes,
  StyleSheet,
  View,
  ListView
} from 'react-native';

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
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});