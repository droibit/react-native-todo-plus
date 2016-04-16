/// <reference path="../../typings/main.d.ts" />

/**
 * Created by kumagai on 2016/04/04.
 */
'use strict';

import dispatcher from '../dispatcher/dispatcher';
import constants from '../constant/todo-constants';
import {EventEmitter} from 'events';

const _todos = {};

const CHANGE_EVENT = 'change';

class _TodoStore extends EventEmitter {

  getTodos() {
    // ListViewを使う場合、配列にしておかないといけない模様。
    const todos = [];
    for (let key in _todos) {
      todos.push(_todos[key]);
    }
    return todos;
  }
  
  getMockTodos(max) {
    const items = [];
    for (let i = 0; i < max; i++) {
      items.push({text: `Item-${i}`});
    }
    return items;
  }
  
  areAllCompleted() {
    for (let todo in _todos) {
      if (!todo.completed) {
        return false;
      }
    }
    return true;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const TodoStore = new _TodoStore();
export default TodoStore;

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
      throw new Error(`Unknown action type: ${action.type}`)
  }
});

function create(text) {
  const id = Date.now() + Math.round(Math.random() * 1000);
  _todos[id] = {
    id: id,
    completed: false,
    text: text,
  };
  console.log(`Created TODO: ${text}`);
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
  console.log(`Updated: ${id}-${updates.completed}`)
}

function destroy(id) {
  delete _todos[id];
}