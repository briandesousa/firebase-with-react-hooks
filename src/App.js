import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Live Grocery List</h1>
        <p>Add yourself to the list then start adding items. When someone else adds items, they will instantly appear in the list.</p>
      </header>
      <div className="container">

        <div className="add-item-column">
          <h3>I am...</h3>
          <div className="button-group">
            <button>Brian</button>
            <button>Holly</button>
            <button>someone else</button>
          </div>
          <h3>I want...</h3>
          <input type="text" name="grocery-list-item" />
        </div>

        <div className="list-column">
          <ul>
            <li>carrots</li>
            <li>pickels</li>
            <li>bread</li>
          </ul>
        </div>

      </div>
      <footer className="app-footer">
        <p>Share your list with others using <a href="/grocery-list?12345">this link</a>.</p>
      </footer>
    </div>
  );
}

export default App;
