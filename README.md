# README

### What is this repository for?
- This is an api that exposes the sales/ppr application functionality of uploading data from our partners.
- The "upload()" function being the main usage, where one function can automate the usage of the GUI sales application

### Setup
##### Easy Install:

The following is a bash script that works as:
1. a script for you to copy and paste and execute whever in your environment you please
2. a script you can pick and choose parts of to set up the environment
3. a general walkthrough on how you can manually perform the setup yourself

```bash
# Step 1: Install Dependencies

# dependencies:
#    nodejs >= 20.18.1
#    csv-parser: >= 3.0.0
#    dotenv: >= 16.4.5


# Step 2: Install the api-sales-app library with npm


# Step 3: Setup up environment variables
# this creates an environment variable file (.env) in the relative location where the library
    # is hard coded to read it from
# It needs the following parameters:
    # ENCRYPTION_KEY: This is provided by Aldo Group to the partner  
    # SECRET_KEY: This is provided by Aldo Group to the partner 
    # COGNITO_TEST_ACCOUNT= This is the email you use to access the sales application in the browser
    # COGNITO_TEST_ACCOUNT_PWD= This is the password you use to access the sales application in the browser
    # FRAN_ID = This is the franchise code you use in the dropdown when uploading the sales.
        # Therefore if you have multiple accounts (e.g. both ALDO and CIS), 
            # you will need multiple scripts OR use the set_env_var() func within your script

Step 4: Use in your application
# see example below for more on this
```

please contact jlumaj@aldogroup.com for more information about this repo
