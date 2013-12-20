#
# Cookbook Name:: noderest
# Attributes:: default
#

default['noderest']['home']     = '/var/noderest'
default['noderest']['user']     = 'noderest'
default['noderest']['group']    = 'noderest'
default['noderest']['source']   = 'https://github.com/jsteer79/noderestPoc.git'
default['noderest']['version']  = 'master'
default['noderest']['temp']     = '/usr/local/src/noderest'
default['noderest']['log']      = '/var/log/noderest'
default['noderest']['env']      = 'live'

