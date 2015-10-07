containername=roccaus
running=`docker ps -a | grep ${containername} | wc -l`
if [ $running = "1" ]; then
    echo running
    docker rm --force ${containername}
else
    echo not running

fi


docker build --rm -t myphp .
docker run --name=roccaus -p 8080:80 -d myphp
