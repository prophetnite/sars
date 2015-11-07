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
authusername="ballz";


curl --insecure --data "token=$authtoken&username=$authusername&serial=$authserial" -X GET https://127.0.0.1/api/v1/log/backup/checkin 
echo $authtoken
exit;

### user token ###
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJ1c2VybmFtZSI6InByb3BoZXRuaXRlIiwiZmlyc3RuYW1lIjoicHJvcGhldCIsImxhc3RuYW1lIjoibml0ZSIsImVtYWlsIjoicHJvcGhldG5pdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.wvFOSe8dtnNEaW9nr4CnTENHNd6gnSuTvVLl0pWPILk