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
import Profile from './pages/profile';
import PrivateRoute from './components/utils/privateRoute'

import { AuthProvider } from './components/utils/auth'

import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/upload' component={Upload} />
            <Route path='/terms' component={Terms} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/forgot' component={Forgot} />
            <PrivateRoute path='/profile' component={Profile} />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App;
