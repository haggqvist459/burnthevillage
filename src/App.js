import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Upload from './pages/upload';
import Terms from './pages/terms';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Home}/>
        <Route path='/upload' component={Upload}/>
        <Route path='/terms' component={Terms}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
