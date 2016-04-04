/// <reference path="../../typings/tsd.d.ts" />

/**
 * Created by kumagai on 2016/04/04.
 */
'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constants/todo-constants'
import {EventEmitter} from 'events';

const _todos = {};
const _emitter = new EventEmitter();

const CHANGE_EVENT = 'change';

export default class TodoStore {

  static get todos() {
    return _todos;
  }

  static emitChange() {
    _emitter.emit(CHANGE_EVENT);
  }

  static addChangeListener(callback) {
    _emitter.on(CHANGE_EVENT, callback);
  }

  static removeChangeListener(callback) {
    _emitter.removeListener(CHANGE_EVENT, callback);
  }
}

dispatcher.register(action => {
  switch (action.type) {
    case constants.TODO_CREATE:
      let text = action.text.trim();
      if (text !== '') {

      }
      break;
    case constants.TODO_DESTROY:
      break;
    default:
      throw new Error("Unknown action type: ${action.type}")
  }
});