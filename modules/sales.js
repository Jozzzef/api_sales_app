import dotenv from 'dotenv';
import {authenticateUser} from "./auth.js"

// Load environment variables from .env file
dotenv.config({ path: "../.env" });
//set env variables alias
const apiUrl = process.env.API_URL;
const cognitoUrl = process.env.COGNITO_URL;
const cognitoClientId = process.env.COGNITO_CLIENT_ID;
const authFlow = process.env.AUTH_FLOW;


export function sales() {
    
}