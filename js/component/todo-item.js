/**
 * Created by kumagai on 2016/04/11.
 */
'use strict';

import React, {
  StyleSheet, 
  Component,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

export default class TodoItem extends Component {

  render() {
    console.log(`Called TodoItem#render()`);
    return (
      <TouchableHighlight underlayColor={`#CFD8DC`} onPress={() => this._onPressRow()}>
        <View style={styles.container}>
          <Text
            style={styles.text}
            numberOfLines={1}
          >{this.props.todo.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressRow() {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: `row`,
    flexWrap: `nowrap`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    height: 60,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
  }
});