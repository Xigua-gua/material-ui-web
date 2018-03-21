import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  withRouter,
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {check } from '../redux/actions/login'
//ui
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import {Button,Typography,Toolbar,AppBar} from 'material-ui'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
//页面路由
import User from './user'
import Operate from './operate'
import Finance from './finance'

const userIcon = <img style={{paddingRight:10}} src={require('../assets/icon-user.png')}/>
const operateIcon = <img style={{paddingRight:10}} src={require('../assets/icon-did.png')}/>
const financeIcon = <img style={{paddingRight:10}} src={require('../assets/icon-finance.png')}/>
const mainIcon = <img style={{paddingRight:10}} src={require('../assets/logo@1x.png')}/>
const personIcon = <img style={{paddingRight:10,}} src={require('../assets/icon-person.png')}/>

const TABS = [
  {
    value: '用户管理',
    icon: userIcon,
    uri: '/user',
  },
  {
    value: '运营管理',
    icon: operateIcon,
    uri: '/operate',
  },
  {
    value: '财务管理',
    icon: financeIcon,
    uri: '/finance',
  },
]


class Main extends Component {
  constructor(props){
    super(props)
    const history = this.props.history
    if (!history.location.pathname.split('/')[1]) {
      history.replace('/user')
    }
    if (!this.props.actions.check()) {
      history.replace('/login')
    }
    this.state = {
      active_tab: `/${history.location.pathname.split('/')[1]}`,
      logining: true,
      user: this.props.actions.check(),
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'loggout') {
      this.props.history.replace('/login')
    }
  }
  _renderLeft() {
    const {classes} = this.props
    return(
      <div className={classes.left}>
        <div className={classes.tab_list}>
          <div className={classes.logo_title}>
            {mainIcon}
            <span className='title-text'>项目后台管理</span>
          </div>
          {
            TABS.map((item,i) => (
              <Link
                to={item.uri}
                key={i}
                className={this.state.active_tab == item.uri ? classes.active_tab : classes.tab}
                onClick={() => {
                  this.setState({
                  active_tab: item.uri,
                })}}
              >
                {item.icon}
                {item.value}
              </Link>
            ))
          }
        </div>
      </div>
    )
  }
  _renderBar() {
    const {classes,user} = this.props
    return (
      <AppBar position="static" className={classes.appBar}>
        <div className={classes.bar_content}>
          {personIcon}
          <span>
            晓晓 | <Button className={classes.button}>退出</Button>
          </span>
        </div>
      </AppBar>
    )
  }
  _renderContent() {
    const {classes} = this.props
    return (
      <main className={classes.content}>
        <Switch>
          <Route path="/user" component={User}/>
          <Route path="/operate" component={Operate}/>
          <Route path="/finance" component={Finance}/>
        </Switch>
      </main>
    )
  }
  _renderRight() {
    const {classes} = this.props
    return (
      <div className={classes.right}>
        {this._renderBar()}
        {this._renderContent()}
      </div>
    )
  }
  render() {
    const {classes} = this.props
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            {this._renderLeft()}
            {this._renderRight()}
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const styles = {
  root: {
    width: '100%',
    height: "100%",
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  left: {
    // flex:1,
    padding: 0,
    width: 166,
    minWidth: 166,
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    width: '100%',
    height: 54,
    background: '#3DC9B6',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  bar_content: {
    fontWeight: 300,
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    padding: '30px 30px',
    overflow: 'auto',
    // width: '100%',
  },
  tab_list: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#495566',
  },
  text: {
    // fontSize: 18,
    fontWeight: 300,

  },
  logo_title: {
    height: 54,
    display: 'flex',
    alignItems: 'center',
    background: '#2C384A',
    color: 'white',
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: 300,
  },
  active_tab: {
    border: 0,
    height: 42,
    color: 'white',
    fontSize: 14,
    fontWeight: 200,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    background: '#3DC9B6'
  },
  tab: {
    border: 0,
    height: 42,
    color: 'white',
    fontSize: 14,
    fontWeight: 200,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  button: {
    minWidth: 48,
    minHeight: 22,
    padding: 0,
    fontSize: 14,
    color: '#fff',
    fontWeight: 400,
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({check}, dispatch),
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Main)))
