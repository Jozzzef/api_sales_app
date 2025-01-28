import {authenticateUser} from "./auth.js"
import {mutation_ppr, dummy_ppr_variables} from "./graphql.js"


//async function sales_endpoint_call(auth_token, mut_variables, key) {
//    // send to graphql endpoint
//    try {
//        const response = await fetch(apiUrl, {
//            method: "POST",
//            headers: {
//                "Accept": "*/*",
//                "Content-Type": "application/json",
//                'Authorization': `${auth_token}`
//            },
//            body: JSON.stringify({query: mutation_sales, operationName:"submitSales", variables: mut_variables})
//        });
//        let data = await response.json();
//
//        if (data.errors) {
//            throw new Error("Something went wrong when data was processed by GraphQL: " + 
//                JSON.stringify(data.errors), 
//                JSON.stringify(data.data)); 
//        }
//        else if (data.data.submitSales.errors) {
//            throw new Error("Something went wrong when data was processed by GraphQL: " + 
//                JSON.stringify(data.data.submitSales.errors))
//        }
//        else if (response.ok) {
//            return data;
//        } 
//        else {
//            throw new Error("Something went wrong when calling to API: " + data);
//        }
//    } catch (error) {return error;}
//}


export async function ppr(dates, file, username, password) {
    // Load loc env variables
    const loc = require('../loc.json')
    const apiUrl = decrypt(loc.API_URL,key);
    const cognitoUrl = decrypt(loc.COGNITO_URL, key);
    const cognitoClientId = decrypt(loc.COGNITO_CLIENT_ID, key);
    const authFlow = loc.AUTH_FLOW;
    // main ppr upload workflow
    const auth_token = await authenticateUser(
        username, 
        password, 
        cognitoUrl, 
        cognitoClientId, 
        authFlow, 
        apiUrl
    );
    // const graphql_csv_var = await sales_mutation_variable_factory(file_path, franchisee_id);
    // return await sales_endpoint_call(auth_token, graphql_csv_var);
}
