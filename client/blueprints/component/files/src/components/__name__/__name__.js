
import React, { Component } from 'react'
import classes from './<%= pascalEntityName %>.scss'

class <%= pascalEntityName %> extends Component {
  static propTypes = {}
  static defaultTypes = {}

  render () {
    return (
      <div className={classes['<%= pascalEntityName %>']}>
        <h1><%= pascalEntityName %></h1>
      </div>
    )
  }
}

export default <%= pascalEntityName %>
