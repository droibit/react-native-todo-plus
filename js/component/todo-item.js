/**
 * Created by kumagai on 2016/04/11.
 */
'use strict';

import React, {
  StyleSheet, 
  Component,
  View,
  Text
} from 'react-native';

export default class TodoItem extends Component {

  render() {
    console.log("Called TodoItem#render()");
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.todo.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'left',
  }
});