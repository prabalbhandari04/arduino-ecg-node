var http = require('http');
var fs = require('fs');
var index = fs.readFileSync( 'index.html');


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM6', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));




// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
  console.log('ECG LIVE DATA :', data);
});


var io = require('socket.io')(app );

io.on('connection', function(socket) {
    
    console.log('Node is listening to port');
    
});

parser.on('data', function(data) {
    
  console.log('ECG LIVE DATA : ' + data);
  
  io.emit('data', data);
  
});



var app = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
});
 
app.listen(3000)