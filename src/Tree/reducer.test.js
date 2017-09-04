import { fromJS } from 'immutable';

import reducer from './reducer';

import {
  changeName,
  removeNode
} from '../actions';

describe('Reducer', () => {
  var initialState = fromJS({
    nodes: [
      {
        id: 1,
        name: 'Node 1'
      },
      {
        id: 2,
        name: 'Node 2'
      }
    ]
  });

  describe('#addNode', () => {
    it('adds a node', () => {

      var action = {
        type: "ADD_NODE",
        payload: {
          id: 3,
          parentId: 2
        }
      };

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
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
            name: 'Place Holder',
            parentId: 2
          }
        ]
      }))
    });
  });

  describe('#changeName', () => {
    it('changes the name of a node', () => {
      var action = changeName(1, 'New Name Here');

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        nodes: [
          {
            id: 1,
            name: 'New Name Here'
          },
          {
            id: 2,
            name: 'Node 2'
          }
        ]
      }))
    });
  });

  describe('#removeNode', () => {
    it("removes a node and its descendants", () => {
      var initialState = fromJS({
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
            parentId: 4
          },
          {
            id: 6,
            name: 'Node 6',
            parentId: 5
          },
          {
            id: 7,
            name: 'Node 7',
            parentId: 2
          }
        ]
      });

      var action = removeNode(1);

      var nextState = reducer(initialState, action);

      expect(nextState).toEqual(fromJS({
        nodes: [
          {
            id: 2,
            name: 'Node 2'
          },
          {
            id: 7,
            name: 'Node 7',
            parentId: 2
          }
        ]
      }));
    });
  });
});
