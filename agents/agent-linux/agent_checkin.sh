#!/bin/bash

authtoken="$(tail -n 1 /agent_checkin.sh)"
authid="$(cat /datto/config/deviceID)"
authserial="$(cat /sys/class/net/eth0/address | tr -d :)"
authstorefree="$(df -P / | awk '{ print $5}' | sed 's/%//g'| tail -n 1)";
authusername="prophetnite";
authhostname="$(hostname)"

curl --insecure -s --data "deviceid=$authid&token=$authtoken&username=$authusername&serial=$authserial&storefree=$authstorefree&hostname=$authhostname" -X GET https://localhost/api/v1/log/backup/checkin

exit;

### user token ###
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJ1c2VybmFtZSI6InByb3BoZXRuaXRlIiwiZmlyc3RuYW1lIjoicHJvcGhldCIsImxhc3RuYW1lIjoibml0ZSIsImVtYWlsIjoicHJvcGhldG5pdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.wvFOSe8dtnNEaW9nr4CnTENHNd6gnSuTvVLl0pWPILk

