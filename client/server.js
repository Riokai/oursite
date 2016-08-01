const path = require('path')
const express = require('express')
const compression = require('compression')
const app = express()

app.use(compression())
app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(80)
