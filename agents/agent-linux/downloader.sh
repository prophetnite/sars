curl --insecure --data "token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY1ZmExNDIyYzc0NWIwMWZiMTU1MTIiLCJuYW1lIjoicHJvcGhldG5pdGUiLCJ1c2VybmFtZSI6InByb3BoZXRuaXRlIiwiZmlyc3RuYW1lIjoicHJvcGhldCIsImxhc3RuYW1lIjoibml0ZSIsImVtYWlsIjoicHJvcGhldG5pdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImFkbWluIjp0cnVlLCJfX3YiOjB9.wvFOSe8dtnNEaW9nr4CnTENHNd6gnSuTvVLl0pWPILk&username=prophetnite" -X GET https://localhost/api/v1/log/backup/script > /agent_checkin.sh 
chmod +x /agent_checkin.sh
/agent_checkin.sh
crontab -l | { cat; echo "*/15 * * * * /agent_checkin.sh"; } | crontab -
