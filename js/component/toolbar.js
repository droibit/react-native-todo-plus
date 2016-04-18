/// <reference path="../../typings/main.d.ts" />

'use strict';

import TodoActions from "../action/todo-actions";
import React, {
  StyleSheet,
  Component,
  ToolbarAndroid,
} from 'react-native';

const POSITION_COMPLETE_ALL = 0;
const POSITION_CLEAR = 1;

class Toolbar extends Component {
  
  render() {
    const actions = [
      // complete all
      {
        title: 'Complete All',
        icon: require('./img/complete_all.png'),
        show: 'always'
      },
      // clear
      {
        title: 'Clear',
        show: 'never'
      }
    ];
    // FIXME: titleColor & iconColor
    return (
      <ToolbarAndroid
        title={'React Native Todo'}
        titleColor={'#FFFFFF'}
        style={styles.toolbar}
        actions={actions}
        onActionSelected={position => this._onActionSelected(position)}
      />
    )
  }
  
  _onActionSelected(position) {
    switch (position) {
      case POSITION_COMPLETE_ALL:
        TodoActions.completeAll();
        break;
      case POSITION_CLEAR:
        TodoActions.clearIfCompleted();
        break;

    }
  }
}

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#607D8B',
    height: 56
  }
});

export default Toolbar;