
import React, { Component } from 'react'
import classes from './Message.scss'

class Message extends Component {
  static propTypes = {}
  static defaultTypes = {}

  render () {
    return (
      <div className={classes['Message']}>
        <h1>Message</h1>
      </div>
    )
  }
}

export default Message
