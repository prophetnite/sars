#!/bin/bash
#checkin_auth.sh

#iwlist wlan0 scanning > wifidump.txt

#wifi_list="$(grep ESSID wifidump.txt)"
#wifi_list="$(echo $wifi_list | tr -d '\n')"
#wifi_list="$(echo $wifi_list | tr -s ' ' ',')"

authtoken="$(tail -n 1 agent_checkin.sh)"

curl --insecure --data "token=$authtoken&username=device1234&wifi=$wifi_list" -X GET https://localhost/api/log_ip/post 
echo $authtoken
exit;

### user token ###
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJ1c2VybmFtZSI6InByb3BoZXRuaXRlIiwiZmlyc3RuYW1lIjoicHJvcGhldCIsImxhc3RuYW1lIjoibml0ZSIsImVtYWlsIjoicHJvcGhldG5pdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.wvFOSe8dtnNEaW9nr4CnTENHNd6gnSuTvVLl0pWPILk
