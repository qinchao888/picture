const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // 解决跨域问题
  next();
});

app.use('/', express.static(path.join(__dirname, 'images')))

app.get('/source1', async (req, res) => { // buffer
  const path = './images/1.jpg'
  const result = fs.readFileSync(path)
  res.send(result)
})

app.get('/source2', async (req, res) => { // binary
  const result = fs.readFileSync('./images/1.jpg', 'binary')
  res.write(result, 'binary')
  res.end()
})

app.get('/source3', async (req, res) => { // base64
  const path = './images/1.jpg'
  const result = fs.readFileSync(path, 'base64')
  res.send(result)
})

app.get('/source4', async (req, res) => { // base64
  const path = './images/1.jpg'
  const result = fs.readFileSync(path, 'base64')
  const reg = /^[^]+\.([^\.]+)$/
  res.send(`data:;base64,${result}`)
})

app.listen(8888, () => console.log('Example app listening on port 8888!'))
