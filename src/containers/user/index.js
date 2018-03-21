

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
import {
  Button,AppBar,Toolbar,Typography,Paper,
  Avatar,Badge,IconButton,Divider,
} from 'material-ui'

import List from './list'
import Person from './person'
import Competence from './competence'
import Statistic from './statistic'
import { TABS } from './data'


class User extends Component {
  constructor(props){
    super(props)
    console.log('props->',this.props);
    this.state={
      active_tab: '/list',
    }
  }

  componentDidMount() {
    const location = this.props.history.location
    if (!!location.pathname.split('/')[2]) {
      this.setState({
        active_tab: `/${location.pathname.split('/')[2]}`
      })
    }
  }

  _renderTabs() {
    const {classes} = this.props
    return (
      <div className={classes.tabs}>
        <div className={classes.tab_bar}>
          {
            TABS.map((item,i) => {
              return (
                <Link
                  key={i}
                  onClick={() => this.setState({
                    active_tab: item.uri,
                  })}
                  className={this.state.active_tab == item.uri ? classes.active_tab : classes.tab} to={item.uri}>
                  <span>{item.value}</span>
                  {
                    this.state.active_tab == item.uri ?
                    <span style={{backgroundColor: '#3DC9B6',height: 2}}/>
                    : null
                  }
                </Link>
              )
            })
          }
        </div>
        <span style={{fontSize: 14,color:'#9B9B9B'}}>共20948名用户</span>
      </div>
    )
  }


  render() {
    const {classes} = this.props
    let url = '/user'
    return (
      <BrowserRouter basename={url}>
        <div className={classes.root}>
          <div className={classes.container}>
            {this._renderTabs()}
            <div style={{backgroundColor: '#DDDDDD',height: 1,marginBottom: 30}}/>
            <Switch>
              <Route path={'/list'} component={List}/>
              <Route path={'/person'} component={Person}/>
              <Route path={'/competence'} component={Competence}/>
              <Route path={'/statistic'} component={Statistic}/>
              <Route exact path={'/'} component={List}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
const styles = {
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DDDDDD',
    borderBottonWidth: 2,
  },
  tab_bar: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 30,
    textDecoration: 'none',
    color: 'black',
  },
  active_tab: {
    display: 'flex',
    height: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 30,
    textDecoration: 'none',
    color: '#3DC9B6',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  row_center:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 60,
  },
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
};
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(User)))
