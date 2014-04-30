#!/usr/bin/env node

/* Tsunami Warning System - Buoy Sensor */
/* Generates signals based on user input */
/* Create buoy and generate signal: */
/* 	$node buoy.js <alert-type> <buoy-name> --config config.json */
/* Model - Publisher */

var stomp = require('stomp');

var alert = process.argv[2]; // number of bouy's to create
var buoy = process.argv[3]; // buoy name

//console.log(alert);
// Set to true if you want a receipt
// of all messages sent.
var receipt = true;

// Set debug to true for more verbose output.
// login and passcode are optional (required by rabbitMQ)
var stomp_args ={
        port: 61613,
        host: 'localhost',
        debug: true,
        login: '',
        passcode: ''
};


var client = new stomp.Stomp(stomp_args);

var queue = '/queue/Buoys';

client.connect();

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

function genPressure(type) {
	var pressure = 0.0;
	switch(type) {
	  case 'reg-alert':
		return Math.floor(Math.random() * (104.99 - 95 + 1)) + 95;		
	  case 'low-alert':
		return Math.floor(Math.random() * (114.99 - 105 + 1)) + 105;
	  case 'med-alert':
		return Math.floor(Math.random() * (129.99 - 115 + 1)) + 115;
	  case 'high-alert':
		return Math.floor(Math.random() * (170 - 130 + 1)) + 130;
	}
}

function genSes(type) {
	var richter = 0.0;
	switch(type) {
          case 'reg-alert':
		return Math.floor(Math.random() * (2.99 - 0 + 1)) + 0;
		
	  case 'low-alert':
	  	return Math.floor(Math.random() * (3.99 - 3 + 1)) + 3;
	  case 'med-alert':
	  	return Math.floor(Math.random() * (5.99 - 4 + 1)) + 4;
	  case 'high-alert':
		return Math.floor(Math.random() * (20 - 6 + 1)) + 6;	
	}
}


client.on('connected', function() {
    
    while(true) {
	 var p = genPressure(alert);
	 var r = genSes(alert);
	 
	 var param = '{\"buoy\": \"'+buoy+'\", \"pressure\": '+p+', \"ritcher\": '+r+'}';

	//console.log(param);
        client.send({
            'destination': queue,
            'body': param,
            'persistent': 'true'
        }, receipt);
        sleep(1000);
    }
    //console.log('Produced');
    client.disconnect();
});

client.on('receipt', function(receipt) {
    console.log("ACK: " + receipt);
});

client.on('error', function(error_frame) {
    console.log(error_frame.body);
    client.disconnect();
});

process.on('SIGINT', function() {
    console.log('Buoy Powering off');
    client.disconnect();
    process.exit(0);
});
