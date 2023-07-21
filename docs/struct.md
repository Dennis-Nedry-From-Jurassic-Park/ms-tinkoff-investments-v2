https://www.npmjs.com/package/array-keyed-map
https://www.npmjs.com/package/dispatchqueue

https://github.com/bootandy/dust

sudo du --all --human-readable --apparent-size --threshold=1G
rm -rf PATH_TO_DOCKER_JSON_LOGS
zip -r -s 1024m data.zip data
du -hsc *
apt-get install ncdu




docker run -it --net=atr --rm --link clickhouse_host:clickhouse-server clickhouse/clickhouse-client:21.3.20.1 --host clickhouse-server

docker network create -d bridge atr

docker run -d --net=atr --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v /data/clickhouse/etc/config.xml:/etc/clickhouse-server/config.xml -v /data/clickhouse/log:/var/log/clickhouse-server -v /data/clickhouse/data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine
docker run -d --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine

docker system prune -af 
