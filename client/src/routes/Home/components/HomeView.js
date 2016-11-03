import React, { Component } from 'react'
import classes from './HomeView.scss'
import Module from './Module'
// import { Link } from 'react-router'
import { Modal } from 'antd'

export default class HomeView extends Component {
  render () {
    return (
      <div className={classes.module}>
        <div className={classes.header}>
          <div className={classes['header-title']}>
            <h2>我俩的小站</h2>
          </div>
          <div className={classes['header-info']}>
            <a onClick={this.showSignin}>注册</a>
            <a onClick={this.showLogin}>登录</a>
          </div>
        </div>
        <div className={classes.content}>
          <ul>
            <Module to="/timer" color="#2E95C8">一起的日子</Module>
            <Module to="/gallery" color="#6EC518">照片墙</Module>
            <Module to="/message" color="#B42FD5">留言板</Module>
          </ul>
        </div>
        <Modal
          title="登录"
          visible={true}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>对话框的内容</p>
          <p>对话框的内容</p>
          <p>对话框的内容</p>
        </Modal>
      </div>
    )
  }
}
