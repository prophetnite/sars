# ${1:Project Name}
IP tracking and Mapping

Project designed to track Android/IPhone and Linux/Windows laptops
-IP geolocation and historical mapping
-WiFi mapping and correlation
 

###################################################################


Possible features:
  -Secret and private camera feed from stolen device
  -Track device usage such as online activity, current ISP connection, file listings, keylogging
  -Proxy or VPN detection
  -Remote wipe and unlock of phones
  -Remote wipe and password recovery on laptop systems
  -Remove audio recording
  -Software package auditing
  -Hard drive irreversible

## Installation
```
$ apt-get update & apt-get upgrade
$ apt-get install node nodemon git
$ git clone https://github.com/prophetnite/sars.git
```
Generate local ssl certificates for the server. A passphrase does not need to be entered.
```
$ ./server-init/generate_ssl.sh
```
This should place a file at your system root /nes.env with a path to /sslkeys/ where your certificates have been placed.  This can be moved, you just have to update the path in the /nes.env file with the appropriate location and service port the server will run on.  The default is port 443.

It is reccomended that you use 'nodemon' and setup a dedicated user.  The server should not be run as root.
## Usage
Start the server:
```
$ nodemon main.js
```
It is reccomended that you use 'nodemon' and setup a dedicated user.  The server should not be run as root.
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
## History
TODO: Write history
## Credits
TODO: Write credits
## License
TODO: Write license

## Contact
#### Sebastian
* http://newenglandsecure.com
* email: sebastian[at]newenglandsecure[dot]com
* Twitter: [@prophetnite](https://twitter.com/prophetnite "prophetnite on twitter")

