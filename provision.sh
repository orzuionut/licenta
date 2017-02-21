sudo apt-get -y update

# NGINX
sudo apt-get -y install nginx

# GIT
sudo apt-get -y install git

# NODEJS and NPM
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# MYSQL
sudo apt-get -y update
sudo apt-get -y install build-essential zlib1g-dev git-core sqlite3 libsqlite3-dev
sudo aptitude -y install mysql-server mysql-client

# KURENTO MEDIA SERVER
echo "deb http://ubuntu.kurento.org trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt-get -y update
sudo apt-get -y install kurento-media-server-6.0

# NODE_MODULES SYM_LINK
mkdir ~/vagrant_node_modules
sudo mount --bind ~/vagrant_node_modules /vagrant/node_modules

# ADONIS
sudo npm i -g adonis-cli

# START SERVICES
sudo service nginx start
sudo service kurento-media-server-6.0 start
