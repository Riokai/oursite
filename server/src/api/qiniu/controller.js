import qiniu from 'qiniu'
import Msg from '../../config/message'
import config from '../../config/qiniu'

qiniu.conf.ACCESS_KEY = config.AccessKey
qiniu.conf.SECRET_KEY = config.SecretKey

const upToken = new qiniu.rs.PutPolicy(config.bucket)

export function query (req, res) {
  const token = upToken.token()

  res.header("Cache-Control", "max-age=0, private, must-revalidate")
  res.header("Pragma", "no-cache")
  res.header("Expires", 0)

  res.json({
    ...Msg.success,
    data: {
      token
    }
  })
}
