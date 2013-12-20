# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.define "node" do |node| 
      node.vm.box = "node-0-0-1"
      node.vm.box_url = "http://dev.noauth.imdev5.local/vagrant/node-0-0-1.box"

      node.vm.network :forwarded_port, guest: 8080, host: 8080
      node.vm.network :private_network, ip: "192.168.254.20"

      node.vm.synced_folder "./", "/host"

	  node.vm.provider :virtualbox do |vb|
		vb.customize ["modifyvm", :id, "--cpuexecutioncap", "100"]
  	  end

      node.vm.provision :chef_solo do |chef|
         chef.add_recipe "NodeRest"
         chef.json = {  :noderest => {
                            :env            => "dev",
                            :home           => "/host",
                        },
                        :nodejs => {
                        	:dir			=> "/usr/local",
                        },
                     }
      end
  end
end