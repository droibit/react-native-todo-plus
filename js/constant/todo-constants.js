'use strict';

import keyMirror from 'keymirror';

const constants = keyMirror({
  TODO_CREATE: null,
  TODO_DESTROY: null,
  TODO_COMPLETE: null,
  TODO_UNDO_COMPLETE: null,
  TODO_COMPLETE_ALL: null,
  TODO_CLEAR_IF_COMPLETED: null
});

export default constants;