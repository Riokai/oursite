import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'

class Counter extends Component {
  render () {
    const props = {
      name: 'file',
      action: 'http://upload.qiniu.com/',
      data: {
        token: 'oxBowt2F4le6E0e6fobAIJ1VRH0JucG_hdkU7x8j:CvN7Wve2ovvpEVmAIqvMY-ETXx0=:eyJzY29wZSI6InJpb3NpdGUiLCJkZWFkbGluZSI6MTQ3MDU0NjQ1OH0='
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功。`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败。`)
        }
      },
      multiple: true
    }

    return (
      <Upload {...props}>
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    )
  }
}

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
