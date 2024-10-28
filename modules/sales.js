import dotenv from 'dotenv';
import {authenticateUser} from "./auth.js"
import {mutation_sales, dummy_sales_variables} from "./graphql.js"

// Load environment variables from .env file
dotenv.config({ path: "../.env" });
//set env variables alias
const apiUrl = process.env.API_URL;
const cognitoUrl = process.env.COGNITO_URL;
const cognitoClientId = process.env.COGNITO_CLIENT_ID;
const authFlow = process.env.AUTH_FLOW;


export async function sales(dates, file, username, password) {
    const auth_token = await authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl);
}