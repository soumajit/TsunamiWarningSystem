#!/bin/bash
nohup node sensor-buoy.js reg-alert bouy1 --config config.json &
nohup node sensor-buoy.js low-alert bouy2 --config config.json &
nohup node sensor-buoy.js med-alert bouy3 --config config.json &
nohup node sensor-buoy.js high-alert bouy4 --config config.json &

rm nohup.out
