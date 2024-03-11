#! /bin/bash
echo "please insert the installation key for the DataCatalog"
INSTALLATION_USER=$1
INSTALLATION_EMAIL=$2
INSTALLATION_TOKEN=$3
PORT_DEPLOY=$4
SUBRED_IP=$5
DESIRED_BRANCH=$6


echo "TOKEN_GIT"
git clone https://$INSTALLATION_USER:$INSTALLATION_TOKEN@github.com/Creangel/IFindIT-ReactBasic.git
DEPLOY_DIRECTORY=$(pwd)
mv ./IFindIT-ReactBasic/* ./
mv IFindIT-ReactBasic/.git ./.git && mv IFindIT-ReactBasic/.gitignore ./.gitignore
rm -rf IFindIT-ReactBasic
chmod 777 -R $DEPLOY_DIRECTORY
git config core.filemode false
git config --local user.name $INSTALLATION_USER
git config --local user.email $INSTALLATION_EMAIL
git pull
git fetch --all
git switch $DESIRED_BRANCH
git pull

NAME_CONTAINER_FRONT_END_DATACATALOG_APP=$(basename $(pwd))
echo "NAME_CONTAINER_FRONT_END_DATACATALOG_APP"=$NAME_CONTAINER_FRONT_END_DATACATALOG_APP >> .env
echo "PORT_DEPLOY"=$PORT_DEPLOY >> .env
echo "SUBRED_IP"=$SUBRED_IP >> .env
echo "DEBUG_CONTAINER"="false" >> .env
echo "DEBUG_APP"="false" >> .env

docker-compose up -d