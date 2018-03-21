import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Link, BrowserRouter,Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from './redux/configureStore'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';
import Drawer from 'material-ui/Drawer';

import Login from './containers/login'
import Main from './containers/main'

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: pink,
    error: red,
  },
})

const history = createHistory()
const store = configureStore(history)

export default class RootWithState extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route path="/" component={Main}/>
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
}
