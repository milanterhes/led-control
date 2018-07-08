const io = require('socket.io')()
const raspi = require('raspi')
const rLed = require('raspi-led')

raspi.init(() => {
  const statusLed = new rLed.LED();
  io.on('connection', client => {
      client.send(statusLed.read() == rLed.ON ? true : false);
      console.log('new connection!'+ client.id)
      console.log('sending ' + statusLed.read() == rLed.ON ? true : false);

      client.on('statusChange', newStatus => {
        newStatus ? statusLed.write(rLed.ON) : statusLed.write(rLed.OFF)
        console.log('new status: ', statusLed.read() == rLed.ON ? true : false)
      })
  })
})

const port = 8000;
io.listen(port);
console.log('listening on port ', port);