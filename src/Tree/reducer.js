import { fromJS, List } from 'immutable';

// import {
// } from './actionTypes';

const initialState = fromJS({
  searchTerm: '',
  nodes: [
    {
      id: 1,
      name: 'Node 1'
    },
    {
      id: 2,
      name: 'Node 2'
    },
    {
      id: 3,
      name: 'Node 3',
      parentId: 1
    },
    {
      id: 4,
      name: 'Node 4',
      parentId: 1
    },
    {
      id: 5,
      name: 'Node 5',
      parentId: 2
    },
    {
      id: 6,
      name: 'Node 6',
      parentId: 3
    },
    {
      id: 7,
      name: 'Node 7',
      parentId: 6
    }
  ]
});

function addNode(state, {parentId, id}) {
  return state.updateIn(['nodes'], function (nodes) {
    return nodes.push(fromJS({
      id,
      name: 'Place Holder',
      parentId
    }));
  })
}

function changeName(state, {id, newName}) {
  return state.updateIn(['nodes'], function (nodes) {
    var index = nodes.findIndex(node => node.get('id') === id)

    return nodes.setIn([index, 'name'], newName)
  })
}

function removeNode(state, id) {
  var ids = getChildIds(state.get('nodes'), id)
  return state.updateIn(['nodes'], function (nodes) {
    return nodes.filterNot(function (node) {
      var nodeId = node.get('id');
      return ids.includes(nodeId) || nodeId === id
    });
  })
}

function getChildIds(nodes, id, acc = List()) {
  nodes.forEach(function (node) {
    if (node.get('parentId') === id) {
      acc = getChildIds(nodes, node.get('id'), acc.push(node.get('id')))
    }
  })

  return acc
}

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case 'ADD_NODE':
      return addNode(state, payload);
    case 'CHANGE_NAME':
      return changeName(state, payload);
    case 'REMOVE_NODE':
      return removeNode(state, payload);
    case 'UPDATE_SEARCH_TERM':
      return state.set('searchTerm', payload);
    default:
      return state;
  }
}
