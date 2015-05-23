# Notes
A collections of intructions



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

### Sudo without password

```
sudo visudo
# Add this line to the end of file: 
username ALL = NOPASSWD : ALL
# Change username to your username
# Save and exit
```

