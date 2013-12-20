#
# Cookbook Name:: noderest
# Recipe:: default
#

require 'fileutils'

################################################################################
# configure npm

bash "Configure npm for the proxy" do
  user "root"
  code <<-EOH
	npm config set strict-ssl false --global
  EOH
end

if node['noderest']['env'] == 'dev'

   node.set['noderest']['user']  = 'vagrant'
   node.set['noderest']['group'] = 'vagrant'

else

    ################################################################################
    # Create user and group

    user node['noderest']['user'] do
      home  node['noderest']['home']
      shell '/bin/false'
      system true
      action :create
    end

    group node['noderest']['group'] do
      members "noderest"
      system true
      action :create
    end

    ################################################################################
    # Create home directory

    directory node['noderest']['home'] do
      owner node['noderest']['user']
      group node['noderest']['group']
      mode "755"
      recursive true
      action :create
    end

    service 'noderest' do
      provider Chef::Provider::Service::Upstart
      action :nothing
    end

    ################################################################################
    # Clear old source files

    ruby_block 'Copy source files into home directory' do
      block do
        source_files = Dir.glob(File.join(node['noderest']['home'], '**' ) )
        home_dir     = node['noderest']['home']

        Chef::Log.info "deleting old source files #{source_files}"
        FileUtils.rm_r(source_files)
        raise "Failed to delete old source files" unless Dir.glob(File.join(home_dir, '*.js')).empty?
      end
    end

    ################################################################################
    # checkout source files

    Chef::Log.info "Exporting #{node['noderest']['source']} to #{node['noderest']['temp']}"

    directory node['noderest']['temp'] do
      owner node['noderest']['user']
      group node['noderest']['group']
      mode "755"
      recursive true
      action :create
    end

    git "#{node['noderest']['temp']}" do
        repository node['noderest']['source']
        reference  node['noderest']['version']
        action :export
    end

    ################################################################################
    # Copy source files

    ruby_block 'Copy source files into home directory' do
      block do
        source_files = Dir.glob(File.join(node['noderest']['temp'], 'src', '**' ) )
        home_dir     = node['noderest']['home']

        Chef::Log.info "Copying #{source_files} into #{home_dir}"
        FileUtils.cp_r(source_files, home_dir)
        raise "Failed to copy source files" unless !Dir.glob(File.join(home_dir, '*.js')).empty?
      end
    end
end

################################################################################
# NPM Modules

bash "npm install modules" do
  cwd node['noderest']['home']
  user "root"
  code <<-EOH
    npm install --no-bin-links
  EOH
end

################################################################################
# Make log dir

directory node['noderest']['log'] do
  owner node['noderest']['user']
  group node['noderest']['group']
  mode "755"
  recursive true
  action :create
end

################################################################################
# Make upstart service from template

template "/etc/init/noderest.conf" do
  owner "root"
  group "root"
  mode "644"
  source "noderest.conf.erb"
end

################################################################################
# Start upstart service

service "noderest" do
  provider Chef::Provider::Service::Upstart
  action :restart
end
