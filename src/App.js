import React, { StrictMode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
// store provider
import { Provider } from 'react-redux';
// store middleware allows actions to use async logic (without it, store actions can only do synchronus updates)
import thunkMiddleware from 'redux-thunk';
// root reducer contains all state
import rootReducer from './store/reducers/rootReducer';
import theme from './theme';
import * as page from './pages';
import { PrivateRoute, ViewPlayer, MemberList, AuthProvider, WarList } from './components';
import { ThemeProvider, Grid } from '@material-ui/core'

// store, preferred to create in app because it should not be accessed/imported elsewhere
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

function App() {
  return (
    <Grid>
      <StrictMode>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Provider store={store}>
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
              <PrivateRoute path='/warList' component={WarList} />
            </BrowserRouter>
            </Provider>
          </AuthProvider>
        </ThemeProvider>
      </StrictMode>
    </Grid>
  )
}

export default App;
