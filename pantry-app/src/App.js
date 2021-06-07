import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// Import Components
import Home from './components/Home'

function App() {
  // set state


  // helper functions


  // the return
  return (
    <Router>
      <div className="App">
        <nav>

        </nav>
        <Route exact path='/' component={Home} />
      </div>
    </Router>

  );
}

export default App;
