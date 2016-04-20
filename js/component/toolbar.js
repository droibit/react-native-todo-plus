/// <reference path="../../typings/main.d.ts" />

/* @flow */
'use strict';

import TodoActions from "../action/todo-actions";
import React, {
  StyleSheet,
  Component,
  ToolbarAndroid,
} from 'react-native';

type Action = {
  title: string;
  icon?: any;
  show: string;
};

const POSITION_COMPLETE_ALL: number = 0;
const POSITION_CLEAR: number = 1;

class Toolbar extends Component {
  
  render() {
    const actions: Array<Action> = [
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
        title={'TODO'}
        titleColor={'#FFFFFF'}
        overflowIcon={require('./img/overflow.png')}
        style={styles.toolbar}
        actions={actions}
        onActionSelected={(position: number) => this._onActionSelected(position)}
      />
    )
  }
  
  _onActionSelected(position: number) {
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