#!/bin/bash
echo "starting installer"
echo "checking required dependencies"

echo "this service installer require some python dependencies to work. Are you confortable with permit some installations into this host in order to install the services?"
echo -n "[y/n] "
read AGGR_INSTALLATION
if [ "$AGGR_INSTALLATION" != "y" ]; then 
    echo "installation cancel"
    exit 1
fi

OUTPUT_CHECK_PYTHON=$( python3 --version )
if [ "$OUTPUT_CHECK_PYTHON" == "" ]; then
    echo "Python distribution is not installed in this host"
    echo "It is not possible to continue with the services configuration, please install python or make the environment file by yourself."
    exit 1
else
    PYTHON_VERSION=$( echo "$OUTPUT_CHECK_PYTHON" | awk -F ' ' '{print $2}' | awk -F '.' '{print $2}')
    if [ "$PYTHON_VERSION" -le 9 ]; then
        echo "python version is too old, it is required a python version 3.10 to execute the installer"
        exit 1
    fi
fi
apt install -y python3-pip
if [ $? != 0 ]; then
    echo "it was not possible to install pip, please install python or make the env file by yourself"
else
    pip install "typer[all]"
    if [ $? != 0 ]; then
        echo "it was not possible to install typer, please install typer or make the env file by yourself"
    fi
fi

echo "NOW you can handle the installation routines running the CLI HEATInstaller.py ..."
if [ ! -f "./HEATInstaller.py" ]; then
    echo "HEATInstaller.py file not found in the current path, it is not possible to continue with the installation"
    exit 1
fi
python HEATInstaller.py --help

