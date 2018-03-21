
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
import {getUsersList } from '../../redux/actions/user'
import {
  Checkbox,TextField,Button,AppBar,Toolbar,Typography,Paper,
  Avatar,Badge,IconButton,Divider,
} from 'material-ui'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Tabs, { Tab } from 'material-ui/Tabs'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { TAB_TITLE } from './data'


const searchIcon = <img src={require('../../assets/icon-search.png')}/>


class List extends Component {
  constructor(props){
    super(props)
    // console.log('props->',this.props);
    this.state = {
      button_status: true,
      userlist: [],
    }
  }
  componentWillMount() {
    this.props.actions.getUsersList({
      success: (data) => {
        this.setState({
          userlist: data.items
        })
      }
    })
  }

  toggleButton(t) {

  }
  _renderCheck() {
    const {classes} = this.props
    return (
      <div className={classes.check_item}>
        <div className={classes.row}>
          <div className={classes.row_center}>
            <Checkbox
              value="gilad"
            />
            <span className={classes.label}>
              <span>全部用户</span>
            </span>
          </div>
          <div className={classes.row_center}>
            <Checkbox
              value="gilad"
            />
            <span className={classes.label}>
              <span>禁用用户</span>
            </span>
          </div>
        </div>
        <TextField
          placeholder="搜索用户..."
          type="search"
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.textFieldInput,
            },
          }}
        />
      </div>
    )
  }
  _renderList() {
    const {classes} = this.props
    const {userlist} = this.state
    return (
      <Paper className={classes.list}>
      <Table style={{fontSize: 12,}}>
        <TableHead>
          <TableRow className={classes.table_title}>
            {TAB_TITLE.map((item,i) => (
                <TableCell style={{fontWeight:400,color: '#9B9B9B'}} key={i}>{item}</TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {userlist.slice(0,8).map((n,i) => {
            // console.log('userlist->',userlist);
            return (
              <TableRow key={i} className={ i % 2 == 0 ? classes.odd : classes.even}>
                <TableCell>{n.id}</TableCell>
                <TableCell>{n.nickname}</TableCell>
                <TableCell>{n.sex == 0 ? '男' : '女'}</TableCell>
                <TableCell>
                  {
                    n.position.province  ?
                    `${n.position.province}${n.position.city}`
                    :   '-'
                  }
                </TableCell>
                <TableCell>{n.amount || '-'}</TableCell>
                <TableCell>{n.creact_time || '-'}</TableCell>
                <TableCell>{n.status || '-'}</TableCell>
                <TableCell>{n.update_time || '-'}</TableCell>
                <TableCell >
                  <Button
                    className={n.is_block ? classes.button_disable : classes.button}
                    onClick={() => this.toggleButton()}
                    >
                    {
                      n.is_block ? '解禁' : '禁用'
                    }
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className={classes.page_button}>
        <Button className={classes.change_button}>上 </Button>
        <Button className={classes.change_button}> 下</Button>
      </div>
    </Paper>
    )
  }
  render() {
    return (
      <div style={{flex: 1}}>
        {this._renderCheck()}
        {this._renderList()}
      </div>
    )
  }
}

const styles = {
  check_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    height: 30,
  },
  list: {
    marginBottom: 30,
    boxShadow: 'none'
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
  label: {
    height: 28,
    width: 82,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#F4F8FB',
  },
  textFieldInput: {
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 12,
    padding: '8px 8px',
    paddingLeft: 8,
    width: 256,
    '&:focus': {
      borderColor: '#80bdff',
    },
  },
  table: {
    fontSize: 12,
  },
  table_title: {
    height: 34,
    backgroundColor:'#F4F8FB',
  },
  even: {
    height: 50,
    color:'#393D40',
    fontSize:12,
    backgroundColor: '#F4F8FB',
  },
  odd: {
    height: 50,
    color:'#393D40',
    fontSize:12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3DC9B6',
    minWidth: 48,
    minHeight: 22,
    padding: 0,
    fontSize: 12,
  },
  button_disable: {
    backgroundColor: '#FF5656',
    minWidth: 48,
    minHeight: 22,
    padding: 0,
    fontSize: 12,
  },
  change_button: {
    minWidth: 30,
    minHeight: 30,
    background: '#3DC9B6',
    marginRight: 15,
  },
  page_button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  search_button: {

  },
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userlist: state.userlist,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({getUsersList}, dispatch),
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(List)))
