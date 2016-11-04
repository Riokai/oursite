import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classes from './HomeView.scss'

export default class Module extends Component {
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
