var express = require('express')
var app = express()
var path = require('path')
var formd = require('formidable')
var fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/upload', function(req, res) {
  // console.dir(req)
  // console.dir(res)
  var form = new formd.IncomingForm()

  form.multiples = true

  form.uploadDir = path.join(__dirname, '/uploads')

  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name))
    console.log(path.join(form.uploadDir, file.name))
  })

  form.on('error', function(err) {
    console.log('An error: \n' + err)
  })

  form.on('end', function() {
    res.end('from server: success')
  })

  form.parse(req)
  // console.dir(form)
})

var server = app.listen(3000, function() {
  console.log('Server listening on port 3000')
})