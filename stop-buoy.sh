#!/bin/bash
process_ids=`ps aux | grep $1 | grep -v grep | grep -v /bin/bash | awk '{print $2}'`
while [ 1 ]
do
	echo "test";
	if [ -z "{$process_ids}" ]; then
		process_ids=`ps aux | grep $1 | grep -v grep | awk '{print $2}'`
	else
		break;
	fi
done

for i in $process_ids;
do
	echo $i;
	#echo $2 | sudo -S kill -9 $i;
  kill -9 $i;
done
