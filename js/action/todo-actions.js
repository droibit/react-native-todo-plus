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
  
  static updateCompleted(id, on) {
    const actionType = on ? constants.TODO_COMPLETE : constants.TODO_UNDO_COMPLETE;
    dispatcher.dispatch({
      type: actionType,
      id: id,
    })
  }
}