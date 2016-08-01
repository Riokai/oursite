import React, { Component, PropTypes } from 'react'
import classes from './HomeView.scss'
import { Link } from 'react-router'

export class Module extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }

  render () {
    const {children, color} = this.props

    return (
      <li
        className={classes['module-item']}
        style={{backgroundColor: color}}
      >{children}</li>
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
        <Module color="#2E95C8">一起的日子</Module>
      </ul>
    </div>
  </div>
)

export default HomeView
