import React from 'react';
import { connect } from 'react-redux';

import './ItemNode.css'
import {
  addNode,
  changeName,
  removeNode
} from '../actions';

import {
  nodes,
  searchTerm
} from '../selectors';

function ItemNode(props) {
  var c = new React.Component(props);

  c.state = {
    changingName: false
  }

  c.render = function () {
    var {node, childNodes, term} = c.props;
    var name = node.get('name');
    var matchName = new RegExp(term, 'i', 'g').test(name);
    var style = matchName && term.length ? {border: '1px solid Coral'} : {}

    return (
      <li>
        <span style={style}>
          <button onClick={handleRemoveNode}>
            -
          </button>
          {c.state.changingName ?
            <input
              value={node.get('name')}
              onChange={handleNameChange}
              onBlur={flipChangingName(false)}
              onClick={((e) => e.target.select())}
            /> :
            <span
              onClick={flipChangingName(true)}
            >
              {name}
            </span>
          }

          <button onClick={handleAddChild}>
            +
          </button>
        </span>

        <ul>
          {childNodes.map(function (child) {
            return <ConnectedNode key={child.get('id')} node={child} />
          })}
        </ul>
      </li>
    )
  }

  function flipChangingName(bool) {
    return function (event) {
      event.stopPropagation();
      c.setState({changingName: bool})
    };
  }

  function handleNameChange(event) {
    var { node, changeName } = c.props;
    var name = event.target.value;

    changeName(node.get('id'), name)
  }

  function handleAddChild(event) {
    event.stopPropagation();
    var { node, addNode } = c.props;

    addNode(node.get('id'));
  }

  function handleRemoveNode(event) {
      event.stopPropagation();
      var { node, removeNode } = c.props;

      removeNode(node.get('id'));
  }

  return c;
}

function mapStateToProps(state, {node}) {
  return {
    childNodes: nodes(state, node.get('id')),
    term: searchTerm(state)
  }
}

var ConnectedNode = connect(mapStateToProps, {addNode, changeName, removeNode})(ItemNode);
export default ConnectedNode;
