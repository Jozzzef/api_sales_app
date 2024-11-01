import dotenv from 'dotenv';
const __dirname = import.meta.dirname;
// import * as auth from "../modules/auth.js";

import {upload} from "../main.js"

// Load environment variables from .env file
dotenv.config({ path: __dirname+"/../.env" });
//for testing
const username = process.env.COGNITO_TEST_ACCOUNT;
const password = process.env.COGNITO_TEST_ACCOUNT_PWD;
const apiUrl = process.env.API_URL;
const cognitoUrl = process.env.COGNITO_URL;
const cognitoClientId = process.env.COGNITO_CLIENT_ID;
const authFlow = process.env.AUTH_FLOW;

//let auth_user = await auth.authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl);
//console.log(auth_user);
const filep = '/home/jozeflumaj/Desktop/api_sales_app/temp/2024-01-14_1000453.csv'

const async_wrapper = async () => {
    let res = await upload("sales", filep, "99999", username, password);
    console.log(res)
}
async_wrapper();