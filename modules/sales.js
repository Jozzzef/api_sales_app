import dotenv from 'dotenv';
import {authenticateUser} from "./auth.js";
import {mutation_sales, sales_mutation_variable_factory} from "./graphql.js";

// Load environment variables from .env file
dotenv.config({ path: "../.env" });
//set env variables alias
const apiUrl = process.env.API_URL;
const cognitoUrl = process.env.COGNITO_URL;
const cognitoClientId = process.env.COGNITO_CLIENT_ID;
const authFlow = process.env.AUTH_FLOW;


export async function sales(file_path, franchisee_id, username, password) {
    const auth_token = await authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl);
    const graphql_csv_var = await sales_mutation_variable_factory(file_path, franchisee_id);

    // send to graphql endpoint
    try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            'Authorization': `${auth_token}`
          },
          body: JSON.stringify({query: mutation_sales, variables: graphql_csv_var})
        });
        let res = await response.json();

        if (response.ok) {return response;} 
        else {throw new Exception("Something went wrong when calling to API: " + res);}
      } catch (error) {return error;}
}