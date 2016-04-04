'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constants/todo-constants';

export default class TodoActions {

  static create(text) {
    dispatcher.dispatch({
      type: constants.TODO_CREATE,
      text: text
    })
  }
}