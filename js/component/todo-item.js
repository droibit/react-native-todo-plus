/// <reference path="../../typings/main.d.ts" />

'use strict';

import {CheckboxAndroid} from './lib/android-checkbox'; // FIXME: default
import TodoActions from '../action/todo-actions';
import React, {
  StyleSheet, 
  Component,
  PropTypes,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class TodoItem extends Component {

  render() {
    const textStyle = this.props.todo.completed ?
      styles.completedText :
      styles.notCompletedText;
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
            style={textStyle}
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

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16
  },
  completedText: {
    fontSize: 18,
    color: '#B0BEC5'
  },
  notCompletedText: {
    fontSize: 18
  },
  completeBox: {
    marginRight: 8
  }
});