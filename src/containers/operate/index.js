
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

import Help from './help'
import Public from './public'
import Circle from './circle'


const TABS = [
  {
    value: '救助审核',
    uri: '/help',
  },
  {
    value: '公益推文',
    uri: '/public',
  },
  {
    value: '圈子举报',
    uri: '/circle',
  },
]

class Operate extends Component {
  constructor(props){
    super(props)
    this.state=({
      active_tab: '/help',
    })
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
      </div>
    )
  }


  render() {
    const {classes} = this.props
    let url = '/operate'
    return (
      <BrowserRouter basename={url}>
        <div className={classes.root}>
          <div className={classes.container}>
            {this._renderTabs()}
            <div style={{backgroundColor: '#DDDDDD',height: 1,marginBottom: 30}}/>
            <Switch>
              <Route path={'/help'} component={Help}/>
              <Route path={'/public'} component={Public}/>
              <Route path={'/circle'} component={Circle}/>
              <Route exact path={'/'} component={Help}/>
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

Operate.propTypes = {
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Operate)))
