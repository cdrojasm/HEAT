#!/bin/sh

echo "Starting service"
basePath=$(pwd)

if [ ! -f "$basePath/.env" ]; then
    echo "It not exist a environment variables configuration file."
    exit 1
fi

source .env
echo "debug application container $DEBUG_CONTAINER"
echo "debug app $DEBUG_APP"
echo "deployment port $PORT_DEPLOY"
cd app

currentDirectory=$(pwd)
proxyName=$PROXY_NAME
if [ "$DEBUG_CONTAINER" == "true" ]; then
    echo "starting container debug mode"
    sleep 60m
fi
      
if [ ! -d "$currentDirectory/node_modules" ]; then
    echo "It not exists a nodeJS installed modules directory."
    echo "instalando NodeJS dependencies"
    npm i --force
fi

if [ ! -f "$currentDirectory/next.config.js" ]; then
    echo "it not exists a next.config.js file"
    echo "making next.config.js file"
    echo -e "const isProd = process.env.NODE_ENV === 'production'\nmodule.exports = {\n\tbasePath:isProd? '/$proxyName':'/$proxyName',\n\tenv: {\n\t\tstaticPrefix:isProd? '/$proxyName':'/$proxyName',\n\t\t}\n}" > next.config.js
    echo "removing previous build directory"
    rm -rf .next
fi 

if [ "$DEBUG_APP" == "false" ]; then
    echo "starting production server"
    rm -rf .next
    rm -rf .package-lock.json
    npm run build
    npm run start
else
    echo "starting development server"
    npm run dev
fi