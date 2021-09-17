#!/bin/sh

sudo apt update && sudo apt install wget -y

#wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -
#echo "deb https://packages.erlang-solutions.com/ubuntu focal contrib" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
#
#sudo apt update
#sudo apt install erlang

sudo apt install apt-transport-https -y
wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | sudo apt-key add -
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -

echo "deb https://dl.bintray.com/rabbitmq-erlang/debian focal erlang-22.x" | sudo tee /etc/apt/sources.list.d/rabbitmq.list

sudo apt update
sudo apt install rabbitmq-server

sudo systemctl enable rabbitmq-server

sudo rabbitmq-plugins enable rabbitmq_management

sudo ufw allow proto tcp from any to any port 5672,15672


