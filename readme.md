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
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'myapp'@'localhost' IDENTIFIED BY 'password';
```

```
# For homestaed
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'homestead'@'localhost' IDENTIFIED BY 'secret';
```

### Created_at and updated_at timestamps

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
adduser newusername
adduser newusername sudo

# Note:  Don't use useradd as it doesn't create home folder or assign a password to the user.
# Use userdel 
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

### nginx virtual host for laravel

```
server {
    listen 80;
    server_name sportsbookapi.app;
    root "/var/www/html/sportsbookapi/public";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

### Nginx xenial php7.0 before letencrypt

```
server {
    listen 80;
    server_name citypulses.com www.citypulses.com;
    root "/var/www/html/citypulses/public";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log /var/log/nginx/citypulses.access.log;
    error_log  /var/log/nginx/citypulses.error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

After letsencrypt

```
server {
    server_name citypulses.com www.citypulses.com;
    return 301 https://citypulses.com$request_uri;
}
server {
    listen 443;
    ssl on;
    ssl_certificate /etc/letsencrypt/live/citypulses.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/citypulses.com/privkey.pem;
    server_name www.citypulses.com;
    return 301 https://citypulses.com$request_uri;
}
server {
    listen 443;
    server_name citypulses.com;
    root "/var/www/html/citypulses/public";

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

    access_log /var/log/nginx/citypulses.com-ssl-access.log;
    error_log  /var/log/nginx/citypulses.com-ssl-error.log error;

    sendfile off;

    client_max_body_size 100m;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
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

### crontab for letsencrypt

```
# 12:10am on the first day of the month.
10 0 1 * * sudo letsencrypt renew >> /var/log/letsencrypt-renew.log

# 12:15am on the first day of the month.
15 0 1 * * sudo service nginx reload
```
