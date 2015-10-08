localdir="$(cd ./src;pwd)"
docker run --name=roccaus -v $localdir:/var/www/html -p 8080:80 -d php:5.6-apache
