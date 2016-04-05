'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constant/todo-constants';

export default class TodoActions {

  static create(text) {
    dispatcher.dispatch({
      type: constants.TODO_CREATE,
      text: text
    })
  }
}