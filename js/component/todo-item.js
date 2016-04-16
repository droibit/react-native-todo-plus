/**
 * Created by kumagai on 2016/04/11.
 */
'use strict';

import CheckboxAndroid from './lib/android-checkbox';
import TodoActions from '../action/todo-actions';
import React, {
  StyleSheet, 
  Component,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class TodoItem extends Component {

  render() {
    console.log('Called TodoItem#render');
    return (
      <TouchableHighlight 
        underlayColor={'#CFD8DC'} 
        onPress={() => this._onPressRow()}>
        <View style={styles.container}>
          <CheckboxAndroid
            style={styles.completeBox}
            value={this.props.todo.completed}
            onValueChange={(value) => this._onToggleCompleted(value)}
          />
          <Text
            style={styles.text}
            numberOfLines={1}>
            {this.props.todo.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressRow() {
  }

  _onToggleCompleted(value) {
    console.log(`toggle completed to ${value}`);
    TodoActions.updateCompleted(this.props.todo.id, value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
  },
  completeBox: {
    marginRight: 8
  }
});