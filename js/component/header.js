/// <reference path="../typings/main.d.ts" />

'use strict';

import TodoActions from "../action/todo-actions";
import React, {
  Component, 
  View, 
  TextInput, 
  StyleSheet
} from 'react-native';

export default class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  render() {
    return (
      <View>
        <TextInput
          style={style.header}
          autoFocus={true}
          placeholder={'What is the next plan?'}
          value={this.state.value}
          onChangeText={text => this.setState({value: text})}
          onBlur={() => this._add()}
        />
      </View>
    );
  }

  _add() {
    const title = this.state.value;
    if (title !== '') {
      TodoActions.create(title)
      this.setState({value: ''})
      console.info('Added Todo: ${title}');
    }
  }
}

const style = StyleSheet.create({
  header: {
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
  }
})