Q clickhouse: error [ERR_STREAM_WRITE_AFTER_END]: write after end
A problem with internet connection

SELECT *
FROM system.errors
WHERE value > 0
ORDER BY code ASC
LIMIT 3

https://hungyi.net/posts/wsl2-reserved-ports/
reg add HKLM\SYSTEM\CurrentControlSet\Services\hns\State /v EnableExcludedPortRange /d 0 /f

https://answers.microsoft.com/ru-ru/windows/forum/all/%D1%87%D1%82%D0%BE/8faa3323-09bb-4214-99e9-ac9bf7bb1f7f
https://stackoverflow.com/questions/58216537/what-is-administered-port-exclusions-in-windows-10


netsh interface ipv4 show excludedportrange protocol=tcp

0) Dism /Online /Cleanup-Image /RestoreHealth
1) close all processes of docker (programm & service)
2) netstat -ano | findstr 8123
TCP    127.0.0.1:8123         127.0.0.1:10122        ESTABLISHED     17052                                              
TCP    127.0.0.1:10122        127.0.0.1:8123         ESTABLISHED     17052
3) https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer
find pid=17052 (e.x. WebStorm)
4) netsh int ipv4 add excludedportrange protocol=tcp startport=8123 numberofports=1
   OK
5) start docker
6) start clickhouse
```ps
docker run -d --name clickhouse_host --expose 8123 --restart unless-stopped --ulimit nofile=262144:262144 -p 8123:8123 -v \\wsl$\Ubuntu\clickhouse_data\log:/var/log/clickhouse-server -v \\wsl$\Ubuntu\home\zowie\config.xml:/etc/clickhouse-server/config.xml -v \\wsl$\Ubuntu\home\zowie\users.xml:/etc/clickhouse-server/users.xml -v \\wsl$\Ubuntu\clickhouse_data\data:/var/lib/clickhouse clickhouse/clickhouse-server:23.1.3.5-alpine
```
7) 



netstat -ano | findstr :8123

Нажмите Win+X, выберите командная строка(администратор) или PowerShell(администратор). В открывшемся окне напечатайте Dism /Online /Cleanup-Image /RestoreHealth и нажмите Enter.

Обязательно дождитесь окончания этой команды.
Сообщите результат.

Напечатайте dism.exe /Online /Cleanup-Image /StartComponentCleanup и нажмите Enter.

Обязательно дождитесь окончания этой команды.
Сообщите результат.

Напечатайте sfc /scannow и нажмите Enter.
Сообщите результат.


New-NetFirewallRule -DisplayName "Exclude Port 8123" -Direction Outbound -Protocol TCP -LocalPort 8123 -Action Block

https://clickhouse.com/codebrowser/ClickHouse/contrib/libuv/include/uv/errno.h.html
https://clickhouse.com/codebrowser/ClickHouse/contrib/libuv/include/uv.h.html


