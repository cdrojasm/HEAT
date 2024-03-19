#!/bin/sh
echo "starting HEAT API"
if [ ! -f ./.env ]; then
	echo "environment file not found"
	exit 1
fi
source .env
PORT=$DEPLOYMENT_API_PORT
TIME_OUT=$TIME_OUT
WORKERS=$WORKERS
MODE=$LOG_LEVEL_DEBUG

if [ $DEBUG_CONTAINER -eq "true" ]; then
	# this mode is useful to debug problems during container start up
	echo "starting container debug mode"
	sleep 3600
fi

echo "starting gunicorn"
echo "WORKERS = $WORKERS"
echo "TIME_OUT = $TIME_OUT"
echo "PORT = $PORT"
echo "MODE = $MODE"

gunicorn --bind "0.0.0.0:$PORT" \
	--worker-class gevent \
	--workers "$WORKERS" \
	--log-level $MODE \
	--timeout "$TIME_OUT" patched:app

