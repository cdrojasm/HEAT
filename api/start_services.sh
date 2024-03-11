#!/bin/bash
echo "starting HEAT API"
if [ ! -f ./.env ];then
	echo "environment file not found"
	exit 1
fi
source .env
PORT=$API_PORT
ENABLE_CONNECTIONS=$ENABLE_CONNECTIONS
TIME_OUT=$TIME_OUT
WORKERS=$WORKERS
MODE=$MODE

if [ $DEBUG_CONTAINER -eq "true"];then
	# this mode is useful to debug problems during container start up
	echo "starting container debug mode"
	sleep 3600
fi

gunicorn --bind "0.0.0.0:$PORT" \
	-- worker-class gevent \
	--workers "$WORKERS" \
	--log-level $MODE \
	--timeout "$TIME_OUT" patched:app

