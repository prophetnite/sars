#!/bin/bash

iwlist wlan0 scanning > wifidump.txt

wifi_list="$(grep ESSID wifidump.txt)"
wifi_list="$(echo $wifi_list | tr -d '\n')"
wifi_list="$(echo $wifi_list | tr -s ' ' ',')"


curl --data "account=8976234&wifiap_list=$wifi_list" -X POST http://newenglandsecure.com/checkin.php

