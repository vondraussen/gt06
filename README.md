![Node.js CI](https://github.com/vondraussen/gt06/workflows/Node.js%20CI/badge.svg?branch=master) ![Node.js Package](https://github.com/vondraussen/gt06/workflows/Node.js%20Package/badge.svg)
[![npm audit](https://github.com/vondraussen/gt06/actions/workflows/npm-audit.yml/badge.svg?branch=master)](https://github.com/vondraussen/gt06/actions/workflows/npm-audit.yml)
# GT06 Message Parser
This is a GT06 GPS Tracker message parser implementation. It can be used to implement your own server.
It parses all messages received from the device and creates the response message, if needed.

> Shout out to [Anton Holubenko](https://github.com/AntonHolubenko) because I've copied the initial version from him. [repo/gt06n](https://github.com/AntonHolubenko/gt06n)

## Usage
``` javascript
const Gt06 = require('gt06');
const net = require('net');

var server = net.createServer((client) => {
  var gt06 = new Gt06();
  console.log('client connected');

  client.on('data', (data) => {
    try {
      gt06.parse(data);
    }
    catch (e) {
      console.log('err', e);
      return;
    }

    if (gt06.expectsResponse) {
      client.write(gt06.responseMsg);
    }

    gt06.msgBuffer.forEach(msg => {
      console.log(msg);
    });

    gt06.clearMsgBuffer();
  });
});

server.listen(serverPort, () => {
  console.log('started server on port:', 4711);
});

```
