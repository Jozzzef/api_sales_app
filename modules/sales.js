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

async function sales_endpoint_call(auth_token, mut_variables) {
  // send to graphql endpoint
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        'Authorization': `${auth_token}`
      },
      body: JSON.stringify({query: mutation_sales, operationName:"submitSales", variables: mut_variables})
    });
    let data = await response.json();

    if (data.errors) {
      throw new Error("Something went wrong when data was processed by GraphQL: " + 
        JSON.stringify(data.errors), 
        JSON.stringify(data.data)); 
    }
    else if (response.ok) {
      return data;
    } 
    else {
      throw new Error("Something went wrong when calling to API: " + data);
    }
  } catch (error) {return error;}
}


export async function sales(file_path, franchisee_id, username, password) {
    const auth_token = await authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl);
    const graphql_csv_var = await sales_mutation_variable_factory(file_path, franchisee_id);
    return await sales_endpoint_call(auth_token, graphql_csv_var);
}

