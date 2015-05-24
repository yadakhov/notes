# Notes

But what I do have are a very particular set of notes, notes I have acquired over a very long career.

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

## LINUX

### Add a new user and make give it sudo
```
adduser newusername
adduser newusername sudo

# Note:  Don't use useradd as it doesn't create home folder or assign a password to the user.
# Use userdel 
```

### Add swap in digital ocean ubuntu instance

```

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
```

### sudo without password.  Great for DEV box.

```
sudo visudo
# Add this line to the end of file: 
# Change username to your username
username ALL = NOPASSWD : ALL
# Save and exit
```

