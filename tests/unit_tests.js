import dotenv from 'dotenv';
import * as auth from "../modules/auth.js";
const __dirname = import.meta.dirname;

// Load environment variables from .env file
dotenv.config({ path: __dirname+"/../.env" });
//for testing
const username = process.env.COGNITO_TEST_ACCOUNT;
const password = process.env.COGNITO_TEST_ACCOUNT_PWD;
const apiUrl = process.env.API_URL;
const cognitoUrl = process.env.COGNITO_URL;
const cognitoClientId = process.env.COGNITO_CLIENT_ID;
const authFlow = process.env.AUTH_FLOW;

let auth_user = await auth.authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl);
console.log(auth_user);


console.log("done");