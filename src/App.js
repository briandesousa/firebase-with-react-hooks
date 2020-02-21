import React from 'react';
import CreateList from './scenes/CreateList/CreateList';
import EditList from './scenes/EditList/EditList';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('list') ? <EditList></EditList> : <CreateList></CreateList>;
}

export default App;
