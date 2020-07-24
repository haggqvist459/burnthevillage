import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Upload from './pages/upload';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Home}/>
        <Route path='/upload' component={Upload}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
