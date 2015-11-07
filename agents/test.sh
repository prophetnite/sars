#!/bin/bash

# paramaters to pass 
#token = access token
#deviceid = datto device id
#devserial = mac address
#storefree = free space on main drive 
#username= owner who deployed system

authtoken="$(tail -n 1 agent_checkin.sh)"
authid=""
authserial="$(cat /sys/class/net/eth0/address)"
authstorefree="";
authusername="undefined";


curl --insecure --data "token=$authtoken&username=$authusername&serial=$authserial" -X GET https://127.0.0.1/api/v1/log/backup/checkin 
echo $authtoken
exit;

### user token ###
undefined