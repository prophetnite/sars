#!/bin/bash

openssl genrsa -des3 -out localhost.key 1024

openssl req -new -key localhost.key -out localhost.csr

openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt

sudo mkdir /sslkeys

sudo mv localhost.key localhost.csr localhost.crt /sslkeys 

sudo chmod 600 /sslkeys/localhost.*

clear

ls /sslkeys

echo SSL Keys should have been made 
echo Please name them according to the main.js configuration

