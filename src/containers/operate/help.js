
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
  Checkbox,TextField,Button,AppBar,Toolbar,Typography,Paper,
  Avatar,Badge,IconButton,Divider,
} from 'material-ui'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Tabs, { Tab } from 'material-ui/Tabs'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { TAB_TITLE } from './data'

function createData(id ,name, pet, age, disease, hospital, amount, time, disable) {
  return {id ,name, pet, age, disease, hospital, amount, time, disable}
}
const data = [
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
  createData('184758', '嘻嘻哈哈', '博美', '7个月', '犬瘟热','哈哈哈宠物医院','1000.00','2017-01-03 09:28:01', true),
];

const check_item = ['审核中', '已通过', '未通过']
const searchIcon = <img src={require('../../assets/icon-search.png')}/>

class Help extends Component {
  constructor(props){
    super(props)
    this.state = {
      button_status: true,
    }
  }
  toggleButton(t) {

  }
  _renderCheck() {
    const {classes} = this.props
    return (
      <div className={classes.check_item}>
        <div className={classes.row}>
          {
            check_item.map((item,i) => (
              <div key={i} className={classes.row_center}>
                <Checkbox
                />
                <span className={classes.label}>
                  <span>{item}</span>
                </span>
              </div>
            ))
          }
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
          {data.map((n,i) => {
            return (
              <TableRow key={i} className={ i % 2 == 0 ? classes.odd : classes.even}>
                <TableCell>{n.id}</TableCell>
                <TableCell>{n.name}</TableCell>
                <TableCell>{n.pet}</TableCell>
                <TableCell>{n.age}</TableCell>
                <TableCell>{n.disease}</TableCell>
                <TableCell>{n.hospital}</TableCell>
                <TableCell>{n.amount}</TableCell>
                <TableCell>{n.time}</TableCell>
                <TableCell >
                  <Button
                    className={n.disable ? classes.button : classes.button_disable}
                    onClick={() => this.toggleButton()}
                    >
                    {
                      n.disable ? '审核' : '再审核'
                    }
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
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
  }
}

Help.propTypes = {
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Help)))
