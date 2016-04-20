/// <reference path="../../typings/main.d.ts" />

// @flow
'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constant/todo-constants';
import {EventEmitter} from 'events';

type Todo = {
  id: number,
  completed: boolean,
  text: string,
};

const _todos: {[id:number]: Todo}= {};
const CHANGE_EVENT: string = 'change';

class _TodoStore extends EventEmitter {

  getTodos() {
    // ListViewを使う場合、配列にしておかないといけない模様。
    const todos: Array<Todo> = [];
    for (let key in _todos) {
      todos.push(_todos[key]);
    }
    return todos;
  }

  emitChange(event: ?any) {
    this.emit(CHANGE_EVENT, event);
  }

  addChangeListener(callback: (event: ?any) => void) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: (event: ?any) => void) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const TodoStore: _TodoStore = new _TodoStore();
export default TodoStore;

dispatcher.register((action: {type: string, id: ?number, text: ?string}) => {
  switch (action.type) {
    case constants.TODO_CREATE:
      let text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;
    case constants.TODO_COMPLETE:
      update(action.id, {completed: true});
      TodoStore.emitChange();
      break;
    case constants.TODO_UNDO_COMPLETE:
      update(action.id, {completed: false});
      TodoStore.emitChange();
      break;
    case constants.TODO_COMPLETE_ALL:
      completeAll();
      TodoStore.emitChange();
      break;
    case constants.TODO_CLEAR_IF_COMPLETED:
      let deleted = clearIfCompleted();
      TodoStore.emitChange({type: constants.TODO_CLEAR_IF_COMPLETED, deleted});
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
});

function create(text: string) {
  const id: number = Date.now() + Math.round(Math.random() * 1000);
  _todos[id] = {
    id: id,
    completed: false,
    text: text
  };
  console.log(`Created TODO: ${text}`);
}

function update(id: number, updates: {completed: boolean}) {
  _todos[id] = Object.assign({}, _todos[id], updates);
  console.log(`Updated: ${id}-${updates.completed}`)
}

function completeAll() {
  for (let key in _todos) {
    update(key, {completed: true});
  }
}

function clearIfCompleted() {
  var deleted = false;
  for (let key in _todos) {
    if (_todos[key].completed) {
      delete _todos[key];
      deleted = true;
    }
  }
  return deleted;
}