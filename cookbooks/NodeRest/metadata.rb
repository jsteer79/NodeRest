maintainer       "IT"
maintainer_email "gits"
license          "Apache 2.0"
description      "Installs/Configures Looking Glass"
long_description IO.read(File.join(File.dirname(__FILE__), 'README.md'))
version          "1.0.0"
name             "noderest"
provides         "noderest"

recipe "noderest", "Installs Node.JS based on the default installation method"

%w{ debian ubuntu centos redhat smartos }.each do |os|
    supports os
end
