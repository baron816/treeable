import { createAction } from 'redux-actions';
import uuid from 'uuid/v4'

export var addNode = createAction('ADD_NODE', parentId => ({parentId, id: uuid()}));
export var changeName = createAction('CHANGE_NAME', (id, newName) => ({id, newName}));
export var removeNode = createAction('REMOVE_NODE', id => id);
export var updateSearchTerm = createAction('UPDATE_SEARCH_TERM', term => term)
