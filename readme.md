# Notes

![Notes](http://i.imgur.com/RzbnCFM.jpg)

## git

### Revert to a previous git commit

```
# find the hash you want to revert to by looking at 
git log
# let's assume a867b4af366 is the state you want to revert to
git revert --no-commit a867b4af366..HEAD
# look at the diff to make sure everything is good to go
git diff --staged
# commit
git commit
```

### Squashing commits

```
* Make sure your branch is up to date with the master branch.
* Run `git rebase -i master`.
* You should see a list of commits, each commit starting with the word "pick".
* Make sure the first commit says "pick" and change the rest from "pick" to "squash".
-- This will squash each commit into the previous commit, which will continue until every commit is squashed into the first commit.
* Save and close the editor.
* It will give you the opportunity to change the commit message. 
* Save and close the editor again.
* Then you have to force push the final, squashed commit: `git push -f`.
```

### Squash all commits as 1 commit before PR into develop branch. 

```
git checkout your-feature-branch
git reset $(git merge-base develop $(git branch --show-current))
git add .
# just one mesasge for all the changes
git commit
git push -f
```

### using another ssh key

GIT_SSH_COMMAND="ssh -i ~/.ssh/id_rsa_MY_OTHER_KEY -F /dev/null" git clone git@github.com:yadakhov/project.git
git config core.sshCommand "ssh -i ~/.ssh/id_rsa_MY_OTHER_KEY -F /dev/null"

## GO

### bashrc

```
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```

### gomon

for watching file changes

```
go get -u github.com/c9s/gomon
gomon -- go run main.go 
```

## Java

### Install MySQL conntector without going to Oracle website

```
sudo apt-get install libmysql-java
# find where it is
sudo find / -name 'mysql-connector*'
# should be under these folders.  symlink to lib folders.
/usr/share/java/mysql-connector-java.jar
/usr/share/java/mysql-connector-java-5.1.28.jar
```

## MySQL

### Create a database and a user for the database

```
# Change myapp and password
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'myapp'@'localhost' IDENTIFIED BY 'password';
```

```
# Change myapp and password
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'myapp'@'localhost' IDENTIFIED BY 'password';
```

```
# For homestaed
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'homestead'@'localhost' IDENTIFIED BY 'secret';
```

```
MySQL 5.8 and above
CREATE DATABASE betdata DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
CREATE USER 'betdata'@'localhost' IDENTIFIED BY 'h8!9TA7Fy%E*';
GRANT ALL PRIVILEGES ON betdata.* TO 'betdata'@'localhost' WITH GRANT OPTION;
GRANT PROCESS ON *.* TO betdata@localhost;
```

### Created_at and updated_at timestamps

```sql
CREATE TABLE `pics` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

```sql
CREATE TABLE `laravel` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

## LINUX

### Add a new user and make give it sudo
```bash
# create a new linux uer
adduser newusername

# give sudo
adduser newusername sudo

# Note:  Don't use useradd as it doesn't create home folder or assign a password to the user.
# Use userdel 
```

### Copy root authorized_keys to a new user

```
mkdir /home/yada/.ssh
cp ~/.ssh/authorized_keys /home/yada/.ssh
chown yada:yada -R /home/yada/.ssh
```

### Add swap in digital ocean ubuntu instance

```bash

# Add 1 Gigabyte swap
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile

# see the life
ls -lh /swapfile

# turn it on
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon -s

# see status
free -m
top

# add to /etc/fstab for persistent
sudo vi /etc/fstab
# add to end of file
/swapfile   none    swap    sw    0   0

# swap settings
sudo vi /etc/sysctl.conf
# add to end of file for better server swap setting
vm.swappiness=10
vm.vfs_cache_pressure = 50

```

### sudo without password.  For DEV box.

```
sudo visudo
# Add this line to the end of file: 
# Change username to your username
username ALL = NOPASSWD : ALL
# Save and exit
```

### Install nodejs on Ubuntu LTS

```
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

Note: you don't need to install npm
npm -v
node -v
```

### Server Permission

```
# for nginx which uses php5-fpm
sudo vi /etc/php5/fpm/pool.d/www.conf

# find user = www-data
# Change the value for user and group to your username
```

### Laravel Cache

```php
$cache = "standings($year,$week)";

if (\Request::exists('nocache') || !env('CACHE')) {
    // Do nothing
} elseif (Cache::has($cache) && !Auth::check()) {
    return Cache::get($cache);
}

... slow code

$view = view('page', $data)->render();

Cache::put($cache, $view, 60);
```

## Ubuntu 18.04 LTS php 7.2

```
server {
    listen 80;
    server_name supercontest.com www.supercontest.com;
    root "/var/www/html/supercontest/public";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log /var/log/nginx/supercontest.com-access.log;
    error_log  /var/log/nginx/supercontest.com-error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

### After letsencrypt

```
server {
    server_name skymaxlab.com www.skymaxlab.com;
    return 301 https://skymaxlab.com$request_uri;
}
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/skymaxlab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/skymaxlab.com/privkey.pem;
    server_name www.skymaxlab.com;
    return 301 https://skymaxlab.com$request_uri;
}
server {
    listen 443;
    server_name skymaxlab.com;
    root "/var/www/html/skymaxlab/public";

    index index.html index.htm index.php;

    charset utf-8;

    # cache
    location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
        expires 30d;
        add_header Vary Accept-Encoding;
        access_log off;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log /var/log/nginx/skymaxlab.com-ssl-access.log;
    error_log  /var/log/nginx/skymaxlab.com-ssl-error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

### Disable touchpad on the thinkpad

```
sudo add-apt-repository ppa:atareao/atareao
sudo apt-get update
sudo apt-get install touchpad-indicator
```

### get the develop branch of laravel

```
composer create-project laravel/laravel newproject dev-develop
```

### copy ssh public key to a remote server

http://www.cyberciti.biz/faq/install-ssh-identity-key-remote-host/

```
ssh-copy-id username@remoteserver.com
```

### install composer globaly

```
sudo apt-get install curl php
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### Install letsencrypt

```
sudo apt-get install letsencrypt
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html/rotna/public -d rotna.ca -d www.rotna.ca
```

```
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html/skymaxlab/public -d skymaxlab.com -d www.skymaxlab.com \
    --webroot-path=/var/www/html/jsonprettyprint/public -d jsonprettyprint.org -d www.jsonprettyprint.org
```

### Tar and Untar

```
# tar
tar cvzf archive_name.tar.gz dirname/

# untar
tar xvfz archive_name.tar.gz
```

### Set debian/ubuntu default editor

```
sudo update-alternatives --config editor
```

### Set default java

```
sudo update-alternatives --config java
```


### crontab for letsencrypt

```
sudo su
crontab -e

# Renew monthly 
0 0 1 * * certbot renew --post-hook "systemctl reload nginx"
```

```
# 12:10am on the first day of the month.
10 0 1 * * sudo letsencrypt renew >> /var/log/letsencrypt-renew.log

# 12:15am on the first day of the month.
15 0 1 * * sudo service nginx reload
```

# Git config

```
git config --global user.email "yada.khov@gmail.com"
git config --global user.name "Yada Khov"
git config --global core.editor vim
git config --global push.default simple
git config --global init.defaultBranch master

# list all global configs
git config --global alias.conf 'config --global -l'

# log one liners
git config --global alias.ll 'log --oneline'

# see last git ommit
git config --global alias.last 'log -1 HEAD --stat'

# turn on auto correct
git config --global help.autocorrect 20

# similar to svn
git config --global alias.p 'push'
git config --global alias.co 'checkout'
git config --global alias.st 'status -sb'
git config --global alias.cm 'commit -m'
git config --global alias.d 'diff'


touch  ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
vi  ~/.gitignore_global

git config --global http.postBuffer 500M
git config --global http.maxRequestBuffer 100M
git config --global core.compression 0
```

## Git local reposity config

```
cd ~/code/yourrepo
git config user.name "Yada Khov"
git config user.email "ykhov@ford.com"
git config --list --show-orig
```


# Global .gitignore

```
---
# General
._*
.AppleDouble
.DS_Store
.DS_Store?
.LSOverride
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IntelliJ
.idea
---


```


# .bashrc

```
alias art='php artisan'
alias cc='cd ~/Code;ls -lah';
```

# Enable CORS on nginx

```
sudo apt-get install nginx-extras

# in the nginx conf file

    more_set_headers 'Access-Control-Allow-Origin: $http_origin';
    more_set_headers 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, HEAD';
    more_set_headers 'Access-Control-Allow-Credentials: true';
    more_set_headers 'Access-Control-Allow-Headers: Origin,Content-Type,Accept,Authorization';

    location / {
        if ($request_method = 'OPTIONS') {
            more_set_headers 'Access-Control-Allow-Origin: $http_origin';
            more_set_headers 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, HEAD';
            more_set_headers 'Access-Control-Max-Age: 1728000';
            more_set_headers 'Access-Control-Allow-Credentials: true';
            more_set_headers 'Access-Control-Allow-Headers: Origin,Content-Type,Accept,Authorization';
            more_set_headers 'Content-Type: text/plain; charset=UTF-8';
            more_set_headers 'Content-Length: 0';
            return 204;
        }
        try_files $uri $uri/ /index.php?$query_string;
    }

```

# Death Adder mouse on linux. Fix sensitivity problem.

```
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install razercfg qrazercfg

sudo apt install qrazercfg-applet
```

## install ethereum on ubuntu

```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum

```

## supervisor

```
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

## install acestream for ubuntu

```
sudo apt-get install snap snapd
sudo snap install acestreamplayer
snap run acestreamplayer
```

## Fix java label problem

```
E: Repository 'http://ppa.launchpad.net/webupd8team/java/ubuntu bionic InRelease' changed its 'Label' value from 'Oracle Java (JDK) 8 / 9 Installer PPA' to 'Oracle Java (JDK) 8 Installer PPA' 
N: This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details.

sudo apt-get --allow-releaseinfo-change update
```

### Ubuntu 18.04 LEMP

```
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install nginx
sudo apt-get install mysql-server
sudo apt-get install php7.2 php-fpm php-mysql
sudo apt-get install composer
sudo apt-get install \
php7.2            php7.2-curl       php7.2-gmp        php7.2-mbstring   php7.2-pspell     php7.2-sybase \
php7.2-bcmath     php7.2-dba        php7.2-imap       php7.2-mysql      php7.2-readline   php7.2-tidy \
php7.2-bz2        php7.2-dev        php7.2-interbase  php7.2-odbc       php7.2-recode     php7.2-xml \
php7.2-cgi        php7.2-enchant    php7.2-intl       php7.2-opcache    php7.2-xmlrpc \
php7.2-cli        php7.2-fpm        php7.2-json       php7.2-pgsql      php7.2-soap       php7.2-xsl \
php7.2-common     php7.2-gd         php7.2-ldap       php7.2-phpdbg     php7.2-sqlite3    php7.2-zip
sudo apt-get install redis-server
```

### Ubuntu 20.04 LEMP

```

# remove apache2.  It will try to compete with port 80
sudo apt-get remove apache2

sudo apt-get install nginx 

sudo apt-get install mysql-server 

sudo apt-get install php7.4 

sudo apt-get install composer

sudo apt-get install   php7.4-common     php7.4-fpm        php7.4-intl       php7.4-odbc       php7.4-readline   php7.4-tidy \
php7.4-bcmath     php7.4-curl       php7.4-gd         php7.4-json       php7.4-opcache    php7.4-xml \
php7.4-bz2        php7.4-dba        php7.4-gmp        php7.4-ldap       php7.4-pgsql      php7.4-soap       php7.4-xmlrpc \
php7.4-cgi        php7.4-dev        php7.4-imap       php7.4-mbstring   php7.4-phpdbg     php7.4-sqlite3    php7.4-xsl \
php7.4-cli        php7.4-enchant    php7.4-interbase  php7.4-mysql      php7.4-pspell     php7.4-sybase     php7.4-zip
```


### Password protect a nginx directory 

```
# create new username bitcoin
sudo sh -c "echo -n 'bitcoin:' >> /etc/nginx/.htpasswd"

# enter the paassword
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"

# look at the password
cat /etc/nginx/.htpasswd


# add the following in nginx config file
location / {
    try_files $uri $uri/ =404;
    auth_basic "Restricted Content";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

### sshfs

Mount a remote folder to local folder through ssh

```
sudo sshfs -o allow_other,defer_permissions bookielab@fantasysupercontest.com:/home/bookielab ~/mnt/supercontest
sudo umount ~/mnt/supercontest
```

### Jupyter Notebook tunneling

```
ssh -L 8888:localhost:8888 yada@yada.page
```
      
### Run Pyton file on save

```
npm i -g nodemon
nodemon yourfile.py
```

### Adding identity to keychain so you don't have to type pass phrase

```
1. ssh-add -K ~/.ssh/id_rsa
Note: change the path to where your id_rsa key is located.

2. ssh-add -A

3. Add to ~/.ssh/config file:

Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```
