/// <reference path="../../typings/tsd.d.ts" />

/**
 * Created by kumagai on 2016/04/04.
 */
'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constant/todo-constants'
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
        create(text);
        TodoStore.emitChange();
      }
      break;
    case constants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;
    case constants.TODO_COMPLETE:
      update(action.id, {completed: true});
      TodoStore.emitChange();
      break;
    case constants.TODO_UNDO_COMPLETE:
      update(action.id, {completed: false});
      TodoStore.emitChange();
      break;
    default:
      throw new Error("Unknown action type: ${action.type}")
  }
});

function create(text) {
  const id = Date.now() + Math.round(Math.random() * 1000);
  _todos[id] = {
    id: id,
    completed: false,
    text: text,
  }
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
  console.log('Updated: ${_todos[id]}')
}

function destroy(id) {
  delete _todos[id];
}