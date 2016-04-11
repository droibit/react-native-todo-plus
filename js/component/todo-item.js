/**
 * Created by kumagai on 2016/04/11.
 */
'use strict';

import React, {
  StyleSheet, 
  Component, 
  Text
} from 'react-native';

export default class TodoItem extends Component {

  render() {
    return (
      <View style={style.container}>
        <Text style={styles.text} />
      </View>
    );
  }
}

const style = StyleSheet.create({
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