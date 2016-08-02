import React, { Component, PropTypes } from 'react'
import classes from './HomeView.scss'
import { Link } from 'react-router'

export class Module extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
  }

  render () {
    const {children, color, to} = this.props

    return (
      <li
        className={classes['module-item']}
        style={{backgroundColor: color}}
      >
        <Link to={to}>{children}</Link>
      </li>
    )
  }
}

export const HomeView = () => (
  <div className={classes.module}>
    <div className={classes.header}>
      <div className={classes['header-title']}>
        <h2>我俩的小站</h2>
      </div>
      <div className={classes['header-info']}>
        <Link to="signin">注册</Link>
        <Link to="loginin">登录</Link>
      </div>
    </div>
    <div className={classes.content}>
      <ul>
        <Module to="/timer" color="#2E95C8">一起的日子</Module>
        <Module to="/gallery" color="#6EC518">照片墙</Module>
        <Module to="/message" color="#B42FD5">留言板</Module>
      </ul>
    </div>
  </div>
)

export default HomeView
