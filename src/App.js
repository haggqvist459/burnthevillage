import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Upload from './pages/upload';
import Terms from './pages/terms';
import Signin from './pages/signin';
import Signup from './pages/signup';
import About from './pages/about';
import Contact from './pages/contact';
import Forgot from './pages/forgot';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Home}/>
        <Route path='/upload' component={Upload}/>
        <Route path='/terms' component={Terms}/>
        <Route path='/signin' component={Signin}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/about' component={About}/>
        <Route path='/forgot' component={Forgot}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
