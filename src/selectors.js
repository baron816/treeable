export function nodes(state, parentId = undefined) {
  return state.getIn(['tree', 'nodes'])
    .filter(function(node){
        return node.get('parentId') === parentId;
    });
}

export function searchTerm(state) {
  return state.getIn(['tree', 'searchTerm']);
}
