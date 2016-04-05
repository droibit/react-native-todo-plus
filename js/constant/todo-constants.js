'use strict';

import {keyMirror} from 'keymirror';

const constants = keyMirror({
  TODO_CREATE: null,
  TODO_DESTROY: null,
  TODO_COMPLETE: null,
  TODO_UNDO_COMPLETE: null,
});

export default constants;