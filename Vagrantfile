# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "0.0.0.0"
  config.vm.network "forwarded_port", guest: 8181, host: 8181, host_ip: "0.0.0.0"

  config.vm.network "forwarded_port", guest: 3306, host: 3306, host_ip: "0.0.0.0"

  config.vm.network :private_network, ip: "192.168.33.10"

  config.vm.provision "shell", path: "provision.sh"

  
  config.vm.provider "virtualbox" do |v|
    v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]

    v.customize ["modifyvm", :id, "--accelerate3d", "off"]
  end
 
end
