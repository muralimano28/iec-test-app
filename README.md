# iec-test-app
This is an assignment app given to me during an interview at iec-abroad.

## Assignment
Use the open data API - http://yourmoneyisnowmymoney.com/api/zipcodes/?zipcode=xxxxx
ex: http://yourmoneyisnowmymoney.com/api/zipcodes/?zipcode=39126
Design a view with a search box where a user can enter either 3 digit number or a 5 digit number
to get location of a address using zip code.
After clicking search , display the detail view in an other view with following details :
Address :
ZipCode :
Use lat & lng attributes to show it in map view
* The data should be fetched in real time

## Server setup
  - Clone this repo.
  
  ```$ git clone https://github.com/muralimano28/iec-test-app.git```
  
  - Change directory to server and install necessary libraries from package.json.
  
  ```$ cd server && npm install```
  
  - Now run node server
  
  ```$ node index.js```
  
## Client Setup
  
  - Change directory to server and install necessary libraries from package.json.
  
  ```$ cd client && npm install```
  
  - After installation, start http-server.
  
  ```$ http-server```
  
  - Now navigate to http://localhost:8080 in browser
  
## Live version url's
I have deployed the same in my domain.
http://muralimanohar.in/iec-test-app
