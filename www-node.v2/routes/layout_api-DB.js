// ===========================
// 			ENDPOINT LAYOUT
// ===========================
// THIS FILE IS FOR NOTES ONLY
// ===========================

PAGES
  DASHBOARD
  DEVICES
  LIVEMAP
  SETTINGS
  CONTACTS
  IP Log_IP
  ABOUT



/api/v1/users/            [POST, GET, PUT, DELETE]
  -_ID                    [Param]
  -update:{key:value}     [Param]

  -name                   [DB]
  -firstname              [DB]
  -lastname               [DB]
  -email                  [DB]
  -password               [DB]
  -admin                  [DB]
  -token_perma            [DB]
  -token_temp             [DB]
  -created                [DB]

/api/v1/log/backup        [POST, GET]
  -Device ID              [DB]
  -Epoch                  [DB]
  -Free storage           [DB]
  -Local IP               [DB]
  -Local MAC              [DB]

/api/v1/log/track         [POST, GET]
  -Local MAC              [DB]
  -Epoch                  [DB]
  -GPS                    [DB]
  -WiFi                   [DB]
  -ip                     [DB]
  -host                   [DB]
  -user-agent             [DB]
  -accept                 [DB]
  -accept-language        [DB]
  -accept-encoding        [DB]
  -connection             [DB]
  -username               [DB]
  -token_temp             [DB]
