import React from "react";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Your React App</h1>
      </header>
      <div className="main-container">
        <nav className="left-nav">
          <h2>Nav Section</h2>
        </nav>
        <main className="main-content">
          <h2>Main container</h2>
        </main>
        <aside className="right-aside">
          <h2>Aside Section</h2>
        </aside>
      </div>
      <footer>
        <p>Footer Part</p>
      </footer>
    </div>
  );
}

export default App;
