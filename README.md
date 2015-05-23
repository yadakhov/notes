# Notes

## MySQL

### Create a database and a user for the database

```
# Change myapp and password
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
GRANT ALL PRIVILEGES ON myapp.* To 'myapp'@'localhost' IDENTIFIED BY 'password';
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
