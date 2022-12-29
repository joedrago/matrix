express = require 'express'
bodyParser = require 'body-parser'
iso8601 = require 'iso8601-duration'
fs = require 'fs'
http = require 'http'
https = require 'https'
Net = require 'net'

config = null
ports = null

now = ->
  return Math.floor(Date.now() / 1000)

serverEpoch = now()
sockets = {}

matrixQuery = (postData) ->
  return new Promise (resolve, reject) ->
    # The HDMI matrix doesn't return proper HTTP replies, so I must manually do this request
    httpRequest = "POST /inform.cgi?undefined HTTP/1.1\r\n" +
      "Content-Type: application/x-www-form-urlencoded\r\n" +
      "Content-Length: #{postData.length}\r\n" +
      "Connection: close\r\n" +
      "\r\n"

    client = new Net.Socket()
    client.setTimeout(5000)
    client.connect { port: 80, host: config.ip }, ->
      client.write(httpRequest)
      client.write(postData)

    str = ""
    client.on 'data', (chunk) ->
      str += String(chunk)
    client.on 'end', ->
      client.destroy()
      data = null
      try
        resolve(JSON.parse(str))
      catch
        reject("failed to parse: #{str}")
    client.on 'timeout', ->
      client.destroy()
      reject('timeout')


matrixStatus = ->
  rawStatus = await matrixQuery("getStatus=")
  status = {}
  for outputIndex in [1..8]
    inputIndex = rawStatus["mapping#{outputIndex}"]
    if not inputIndex?
      inputIndex = 1
    status[outputIndex] = parseInt(inputIndex)
  return status

matrixSet = (output, input) ->
  return matrixQuery("out#{output}=#{input}")

refreshDashboards = ->
  status = await matrixStatus()
  for port in ports.outputs
    port.input = status[port.id]
  for sid, soc of sockets
    soc.emit 'refresh', ports

run = (args) ->
  console.log "RUN: #{JSON.stringify(args)}"

main = (argv) ->
  config = JSON.parse(fs.readFileSync("config.json", "utf8"))
  ports = JSON.parse(fs.readFileSync("ports.json", "utf8"))

  app = express()
  httpServer = http.createServer(app)

  io = require('socket.io')(httpServer)
  io.on 'connection', (socket) ->
    sockets[socket.id] = socket
    refreshDashboards()
    socket.on 'set', (msg) ->
      try
        await matrixSet(msg.output, msg.input)
      catch e
        console.log "ERROR: #{e}"
        return
      refreshDashboards()
    socket.on 'disconnect', ->
      if sockets[socket.id]?
        delete sockets[socket.id]

  app.get '/', (req, res) ->
    html = fs.readFileSync("#{__dirname}/../web/dashboard.html", "utf8")
    res.send(html)

  app.use(bodyParser.json())
  app.post '/cmd', (req, res) ->
    console.log req.body
    if req.body? && req.body.cmd?
      args = req.body.cmd.split(/\s+/g)
      response = run(args)
      console.log "CMD: #{response}"
      res.send(response)
      return
    res.send("MATRIX: wat")

  app.use(express.static('web'))

  httpServer.listen 3005, ->
    console.log('listening on port 3005')

module.exports = main
