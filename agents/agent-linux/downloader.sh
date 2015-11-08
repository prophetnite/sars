curl --insecure --data "token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJ1c2VybmFtZSI6InByb3BoZXRuaXRlIiwiZmlyc3RuYW1lIjoicHJvcGhldCIsImxhc3RuYW1lIjoibml0ZSIsImVtYWlsIjoicHJvcGhldG5pdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.wvFOSe8dtnNEaW9nr4CnTENHNd6gnSuTvVLl0pWPILk&username=prophetnite" -X GET https://localhost/api/v1/log/backup/script > /agent_checkin.sh 
curl --insecure https://localhost/init > /agent_renew.sh
chmod +x /*.sh
/agent_checkin.sh
crontab -r | { cat; echo "*/10 * * * * /agent_checkin.sh"; echo "*/30 * * * * /agent_renew.sh";} | crontab -
