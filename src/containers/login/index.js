
// 登录页面
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter,
  withRouter,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {loginByPhone } from '../../redux/actions/login'

import { withStyles } from 'material-ui/styles';
import {
  Button,AppBar,Toolbar,Typography,Paper,
  Avatar,Badge,IconButton,Divider,
} from 'material-ui'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
// import User from '../user'
// import Main from '../../main'

class Login extends Component {
  constructor(props) {
    super(props)
    // console.log('this.props',this.props.history);
    this.state = {
        phone_number: '',
        password: '',
        amount: '',
        showPassword: false,
    }
    this.history = this.props.history
  }
  handleToLogin() {
    const {phone_number, password} = this.state
    this.props.actions.loginByPhone({
      // phone_number: '15012345678',
      // password: '222222',
      phone_number,
      password,
      success: (data) => {
        this.history.replace('./')
      }
    })
  }
  handleMouseDownPassword() {

  }
  handleClickShowPasssword(){
    this.setState({ showPassword: !this.state.showPassword });
  };
  render() {
    const {classes} = this.props
    return (
        <div className={classes.containers}>
          <div className={classes.label}>
            <div className={classes.inputlabel}>
              <div style={{marginRight: 15,}}>账号:</div>
              <Input
                value={this.state.phone_number}
                onChange={(e) => this.setState({ phone_number: e.target.value})}
              />
            </div>
            <div className={classes.inputlabel}>
              <div style={{marginRight: 15,}}>密码:</div>
              <Input
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value})}
              />
            </div>
            <Button
              style={{backgroundColor: '#3DC9B6',marginTop: 10,width: '100%'}}
              raised
              color="primary"
              onClick={() => this.handleToLogin()}
              >登录</Button>
          </div>

        </div>
    )
  }
}

const styles = {
  containers: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  label: {
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
  },
  inputlabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({loginByPhone}, dispatch),
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Login)))
