#!/bin/bash
# checkin_auth.sh     #MAC VERSION
iwlist wlan0 scanning > wifidump.txt

wifi_list="$(grep ESSID wifidump.txt)"
wifi_list="$(echo $wifi_list | tr -d '\n')"
wifi_list="$(echo $wifi_list | tr -s ' ' ',')"

authtoken="$(tail -n 1 checkin_auth.sh)"

curl --data "account=$authtoken&wifiap_list=$wifi_list" -X POST http://newenglandsecure.com/checkin.php
echo $authtoken
exit;
#
### user token ###
asdfasdfasdfasdf
