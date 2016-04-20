/* @flow */
'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constant/todo-constants';

export default class TodoActions {

  static create(text: string) {
    dispatcher.dispatch({
      type: constants.TODO_CREATE,
      text: text
    });
  }
  
  static updateCompleted(id: number, on: boolean) {
    const actionType = on ? constants.TODO_COMPLETE : constants.TODO_UNDO_COMPLETE;
    dispatcher.dispatch({
      type: actionType,
      id: id
    });
  }

  static completeAll() {
    dispatcher.dispatch({
      type: constants.TODO_COMPLETE_ALL
    });
  }

  static clearIfCompleted() {
    dispatcher.dispatch({
      type: constants.TODO_CLEAR_IF_COMPLETED
    });
  }
}