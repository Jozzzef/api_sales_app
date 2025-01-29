# API FOR SALES / PPR APP 

### What is this repository for?
- This is an api that exposes the sales/ppr application functionality of uploading data from our partners.
- The "upload()" function being the main usage, where one function can automate the usage of the GUI sales application

### Setup
##### Easy Install:

The following is a bash script that works as:
1. a script for you to copy and paste and execute whever in your environment you please
2. a script you can pick and choose parts of to set up the environment
3. a general walkthrough on how you can manually perform the setup yourself

##### Fedora Easy Install
```bash
# Step 1: Install Dependencies

# nodejs >= 20.18.1
sudo dnf module enable nodejs:20 -y # v20 is the stream of the package we want
sudo dnf install nodejs -y

# Step 2: Install the api-sales-app library with npm
read -p "Enter the path where you downloaded api_sales_app: " path_to_lib
npm install -g path_to_lib #this will install other dependencies as well

# Step 3: Setup up environment variables
# this creates an environment variable file (.env) in the relative location where the library
    # is hard coded to read it from
# It needs the following parameters:
    # ENCRYPTION_KEY: This is provided by Aldo Group to the partner  
    # SECRET_KEY: This is provided by Aldo Group to the partner 
    # COGNITO_ACCOUNT= This is the email you use to access the sales application in the browser
    # COGNITO_ACCOUNT_PWD= This is the password you use to access the sales application in the browser
    # FRAN_ID = This is the franchise code you use in the dropdown when uploading the sales.
        # Therefore if you have multiple accounts (e.g. both ALDO and CIS), 
            # you will need to use the set_env_var(mode="change_FRAN_ID") func within your script
node << EOF
const api = require('api_sales_app')
api.set_env_var(mode="interactive")
EOF

# Step 4: Use in your application
# see example below for more on this
```
##### Windows Easy Install
- Save the below as install_api.bat (naming is arbitrary as long as .bat) and run as administrator.
```batch
@echo off

:: Step 1: Install Node.js
echo Installing Node.js...
winget install OpenJS.NodeJS.LTS

:: Step 2: Install api-sales-app
set /p path_to_lib="Enter the path where you downloaded api_sales_app: "
call npm install -g %path_to_lib%

:: Step 3: Setup environment variables
echo Setting up environment variables...
node -e "const api = require('api_sales_app'); api.set_env_var({mode: 'interactive'});"

echo Installation complete. Check the .env file in your working directory.
```


##### Example Usage
```javascript
const api = require("api_sales_app");
```

please contact jlumaj@aldogroup.com for more information about this repo
