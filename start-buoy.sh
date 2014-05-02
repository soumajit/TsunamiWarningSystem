#!/bin/bash
nohup node sensor-buoy.js reg-alert buoy1 --config config.json &
nohup node sensor-buoy.js low-alert buoy2 --config config.json &
nohup node sensor-buoy.js med-alert buoy3 --config config.json &
nohup node sensor-buoy.js high-alert buoy4 --config config.json &

rm nohup.out
