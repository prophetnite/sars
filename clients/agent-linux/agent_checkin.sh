#!/bin/bash
#checkin_auth.sh

iwlist wlan0 scanning > wifidump.txt

wifi_list="$(grep ESSID wifidump.txt)"
wifi_list="$(echo $wifi_list | tr -d '\n')"
wifi_list="$(echo $wifi_list | tr -s ' ' ',')"

authtoken="$(tail -n 1 agent_checkin.sh)"

curl --insecure --data "token=$authtoken&username=device1234&wifi=$wifi_list" -X GET https://sars.newenglandsecure.com/api/mongo/public/create
echo $authtoken
exit;

### user token ###
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiYWRtaW4iOnRydWUsIl9fdiI6MH0.uAE2igqxQbPT6CFFRskRCn-K-jOZYOTP5UtvBDG37Rc
