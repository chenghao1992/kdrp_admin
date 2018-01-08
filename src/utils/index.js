import config from './config'
import menu from './menu'
import request from './request'
import classnames from 'classnames'
import { color } from './theme'
import {
  findPathInTree,
  formatMoney,
  accAdd,
  trans2arr,
  rolesCode,
} from './helper'
// //require('./mock.js')


module.exports = {
  findPathInTree,
  formatMoney,
  accAdd,
  trans2arr,
  config,
  menu,
  request,
  color,
  classnames,
  rolesCode,
}
