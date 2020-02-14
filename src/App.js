import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>Our Live Grocery List</h1>
        <p>Add yourself to the list then start adding items. When someone else adds items, they will instantly appear in the list.</p>
      </header>
      <div className="container">

        <div className="add-item-column">
          <h2>Add an item</h2>
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
          <h2>Watch the list grow</h2>
          <ul>
            <li>carrots</li>
            <li>pickels</li>
            <li>bread</li>
          </ul>
        </div>

      </div>
      <footer className="app-footer">
        <p>Share your list using <a href="http://localhost:3000/grocery-list?12345">http://localhost:3000/grocery-list?12345</a></p>
      </footer>
    </div>
  );
}

export default App;
