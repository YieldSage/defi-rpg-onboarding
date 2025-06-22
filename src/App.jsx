import React, { useState } from 'react';
import Quest from './components/Quest';

export default function App() {
  const [className, setClassName] = useState(null);

  if (!className) {
    return (
      <div className="class-select">
        <h1>Select Your Class</h1>
        <button onClick={() => setClassName('Wizard')}>🧙 Wizard</button>
        <button onClick={() => setClassName('Rogue')}>🗡 Rogue</button>
        <button onClick={() => setClassName('Guardian')}>🛡 Guardian</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Welcome, {className}!</h1>
        <button onClick={() => setClassName(null)}>Reset</button>
      </header>
      <Quest />
    </div>
  );
}