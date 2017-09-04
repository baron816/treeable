import React from 'react';
import { connect } from 'react-redux';
import ItemNode from '../Node/ItemNode';

import {
  addNode,
  updateSearchTerm
} from '../actions';

import {
  nodes,
  searchTerm
} from '../selectors';

function Tree({nodes, addNode, updateSearchTerm, searchTerm}) {
  return(
    <div>
      <button onClick={handleAddChild}>Add Root Node</button>
      <input placeholder='Search' onChange={handleUpdateSearch} value={searchTerm}/>
      <ul>
        {nodes.map(function (node) {
          return <ItemNode key={node.get('id')} node={node} />;
        })}
      </ul>
    </div>
  )

  function handleAddChild() {
    addNode(undefined)
  }

  function handleUpdateSearch(event) {
    var term = event.target.value;

    updateSearchTerm(term)
  }
}

function mapStateToProps(state) {
  return {
    nodes: nodes(state),
    searchTerm: searchTerm(state)
  }
}

export default connect(mapStateToProps, {addNode, updateSearchTerm})(Tree);
