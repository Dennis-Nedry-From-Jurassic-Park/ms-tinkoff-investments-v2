**Prepare historical candles for tinkoff-investments**

```src: app/ms-preparations/src/tinkoff-investments/```
1. create output dir in root dir
2. download shares via (download_md.sh + figi.txt) to zip folder in root dir
3. candles.prepare.zip.to.csv.converter.ts
4. candles.prepare.csv.to.clickhouse.insert.ts
5. OPTIMIZE TABLE default.GetCandles FINAL
6. Дозагрузка свеч: ```SELECT ticker, max(time) as time FROM default.GetCandles GROUP BY ticker```


docker run -d --net=atr --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v /data/clickhouse/etc/config.xml:/etc/clickhouse-server/config.xml -v /data/clickhouse/log:/var/log/clickhouse-server -v /data/clickhouse/data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine


