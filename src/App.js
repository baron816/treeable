import React from 'react';
import './App.css';
import Tree from './Tree/Tree';

function App() {
  var c = new React.Component()

  c.render = function () {
    return (
      <div>
        <Tree />
      </div>
    )
  }

  return c;
}

export default App;
