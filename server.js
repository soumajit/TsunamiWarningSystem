#!/usr/bin/env node

/* Tsunami Warning System */
/* Tsunami Warning System - Central Server */
/* Generates alerts based on buoy sensor */
/* Run server: */
/* 	$node server.js --config config.json */
/* Model - Subscriber*/
/**/
/* Run Monitor Service*/
/*  At http://localhost/tws/index.html */
/* Model - Web-Service*/
/**/
/* Date: Monday 28 April 2014 09:44:53 PM IST */


var http = require('http');	
var sio = require('socket.io');
var stomp = require('stomp');
var config = require('configure');
var sys = require('util');

//var buoyList = new Array();

var server = http.createServer();

var stomp_args ={
    port: config.stomp.port,
    host: config.stomp.host,
    debug: config.stomp.debug,
    login: config.stomp.login,
    passcode: config.stomp.pass
}

var pos = "{\"buoy1\": {\"lat\": 9.092732, \"lng\": 72.494087 }, \"buoy2\": { \"lat\": 8.092732, \"lng\": 74.494087 }, \"buoy3\": { \"lat\": 12.092732, \"lng\": 76.494087 }, \"buoy4\": { \"lat\": 7.092732, \"lng\": 84.494087 }}";

// Server handle to connect to Central Message Broker
var client = new stomp.Stomp(stomp_args); 

// Queue in Message Broker to read data from
var headers = { destination: '/queue/Buoys' };



// Server providing web-socket service
server.listen(8080,function() {
    console.log('\nTsunami Warning System Server');
    console.log('\nRunning on http://0.0.0.0:8080/');
    console.log('\nMonitor Service on http://localhost/web-service/index.html')
});

// Attach the web-socket to server
io = sio.listen(server);

// On connection from Buoys //
io.sockets.on('connection', function(socket) {
    console.log('Monitoring system connected');		

    socket.on('disconnect',function(){
        console.log('Monitoring system disconnected');
    });
});
// Connection to Central Message Broker
client.connect(); 

// Subscribe to messages from Queue
client.on('connected', function() {
    client.subscribe(headers);
    console.log('Subscribed to buoys queue');
});

// Data to web-socket for Monitoring system
client.on('message', function(message) {
    var signal = JSON.parse(message.body);
    io.sockets.volatile.emit('active-buoy', {data: signal.buoy});
    //io.sockets.volatile.emit('sensor-position', {data: pos});

    if ((signal.pressure >= 95 && signal.pressure <= 104.99) &&  (signal.ritcher >= 0 && signal.ritcher <= 2.99) ){
        io.sockets.volatile.emit('reg-alert', {data: message.body});
    }
    if ((signal.pressure >= 105 && signal.pressure <= 114.99) && (signal.ritcher >= 3 && signal.ritcher <= 3.99)) {
        io.sockets.volatile.emit('low-alert', {data: message.body});
    }
    if ((signal.pressure >= 115 && signal.pressure <= 129.99) && (signal.ritcher >= 4 && signal.ritcher <= 5.99)) {
        io.sockets.volatile.emit('med-alert', {data: message.body});
    }
    if ((signal.pressure >= 130 && signal.pressure <= 170) && (signal.ritcher >= 5 && signal.ritcher <= 10)) {
        io.sockets.volatile.emit('high-alert', {data: message.body});
    }
});

client.on('error', function(error_frame) {
    console.log(error_frame.body);
    client.disconnect();
});
