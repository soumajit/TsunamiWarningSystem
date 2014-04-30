#Tsunami Warning System
Welcome to the official repository of Tsunami Warning System. 

##Requirements
TWS mainly requires 
1. (Apache ActiveMQ)[https://activemq.apache.org/activemq-560-release.html] => `5.6.0` 
ActiveMQ is an open source Java JMS message queue. It supports the Stomp protocol, 
which ActiveMessaging uses to send and receive messages.
###Get ActiveMQ
    Download the installation files:
    ```bash
    wget http://archive.apache.org/dist/activemq/apache-activemq/5.6.0/apache-activemq-5.6.0-bin.tar.gz
    ```
    Extract the files:
    ```bash
    tar xvf http://archive.apache.org/dist/activemq/apache-activemq/5.6.0/apache-activemq-5.6.0-bin.tar.gz
    ```
###Configure ActiveMQ
    Edit `conf/activemq.xml` and add the following connector, the port number `61613` is important:
    ```xml
    <transportConnectors>
          <transportConnector name="stomp" uri="stomp://0.0.0.0:61613"/>
    </transportConnectors>
    ```
###Start ActiveMQ
    ```bash
    ./bin/activemq console
    ```
2. (node.js)[http://nodejs.org/] => 0.10
Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, 
scalable network applications. Node.js uses an event-driven, non-blocking I/O model 
that makes it lightweight and efficient, perfect for data-intensive real-time 
applications that run across distributed devices.
```bash
sudo apt-get install nodejs npm
```
3. Other Dependencies: `Socket.io`, `stomp.js` and `configure`
For installing these dependencies we need to install Node.js package manager first.
```bash
sudo apt-get install npm
```
###Get socket.io
`Socket.IO` aims to make realtime apps possible in every browser and mobile device, 
blurring the differences between the different transport mechanisms. It's care-free 
realtime 100% in JavaScript.
```bash
npm install socket.io
```
###Get Stomp
STOMP provides an interoperable wire format so that STOMP clients can communicate 
with any STOMP message broker to provide easy and widespread messaging 
interoperability among many languages, platforms and brokers.
```bash
npm install stomp
```
###Get Configure
A simple multiple-configuration management module
By default the `nodejs` binary is created in `/usr/bin` upon installing `node.js`.
The `Configure` will be installed using the command `node install.js`, what we
need to is to create a symbolic link to `/usr/bin/node` from `nodejs` binary.
```bash
sudo ln -s /usr/bin/nodejs /usr/bin/node
```
```bash
npm install configure
```

##Run the server.js
```bash
node server.js --config config.json
```
##Run the sensor buoys program
```bash 
node sensor-buoy.js <alert-type> <buoy-name> --config config.json
```
<alert-types>: 
1. `reg-alert` : Regular Alert
2. `low-alert` : Low Alert
3. `med-alert` : Medium Alert
4. `high-alert`: High Alert

<buoy-names>
1. `buoy1`
2. `buoy2`
3. `buoy3`

##Deploy the Web Server
TWS comes along with a web service
You could deploy it in either `apache` or `nginix`.
For the simplicity, I prefer, `apache`
###Install Apache
```bash
sudo apt-get install apache2
```
Copy `web-service` to `/var/www` directory
```bash
cp -r web-server /var/www
```
###Configure Apache 
Change the `DocumentRoot` to `/var/www/web-service` in 
`/etc/apache2/sites-available/000-default.conf` file.
Restart the apache to apply the changes
```bash
sudo service apache2 restart
```
You could now open your browser and see what's running on your `localhost` webserver
`http://localhost`
