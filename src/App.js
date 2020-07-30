import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core'
import Home from './pages/homepage';
import Upload from './pages/upload';
import Terms from './pages/terms';
import Signin from './pages/signin';
import Signup from './pages/signup';
import About from './pages/about';
import Contact from './pages/contact';
import Forgot from './pages/forgot';
<<<<<<< HEAD
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Home} />
          <Route path='/upload' component={Upload} />
          <Route path='/terms' component={Terms} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <Route path='/forgot' component={Forgot} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
=======
import Profile from './pages/profile';

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
        <Route path='/profile' component={Profile}/>
      </div>
    </BrowserRouter>
>>>>>>> c52d4b0ebbad164fa379dcc94d5b2c7194368637
  );
}

export default App;
