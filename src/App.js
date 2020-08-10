import React, { StrictMode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import theme from './theme';
import * as page from './pages';
import { PrivateRoute, ViewPlayer, MemberList, AuthProvider } from './components';
import { ThemeProvider } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <StrictMode>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <BrowserRouter>
              {/* page routes */}
              <Route exact path='/' component={page.Home} />
              <Route path='/home' component={page.Home} />
              <Route path='/upload' component={page.Upload} />
              <Route path='/terms' component={page.Terms} />
              <Route path='/signin' component={page.Signin} />
              <Route path='/signup' component={page.Signup} />
              <Route path='/contact' component={page.Contact} />
              <Route path='/about' component={page.About} />
              <PrivateRoute path='/profile' component={page.Profile} />
              <PrivateRoute path='/clan' component={page.Clan} />
              {/* component routes */}
              <Route path='/viewPlayer' component={ViewPlayer} />
              <PrivateRoute path='/memberList' component={MemberList} />
            </BrowserRouter>
          </AuthProvider>
        </ThemeProvider>
      </StrictMode>
    </div>
  )
}

export default App;
