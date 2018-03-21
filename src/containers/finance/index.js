

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  withRouter,
  BrowserRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'


class Finance extends Component {
  constructor(props){
    super(props)
    this.state=({
    })
  }

  render() {
    let url = '/finance'
    return (
      <BrowserRouter basename={url}>
        <div>
          <div>
            财务管理 内容
          </div>
          <Switch>
            <Route exact path={url} render={() => (
              <h3>财务管理默认页面.</h3>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const styles = {

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch),
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Finance)))
