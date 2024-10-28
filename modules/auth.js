import * as enc from "./enc.js"
import {mutation_sales, dummy_sales_variables} from "./graphql.js"

// POST request to API; authenticate user, receive token, save token.
export async function receiveToken(username, password, cognitoUrl, cognitoClientId, authFlow) {
    
    //as specified by dev enviroment call in insomnia
    const requestBody = {
      AuthFlow: authFlow,
      ClientId: cognitoClientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    };
  
    try {
        const response = await fetch(cognitoUrl, {
            method: "POST",
            headers: {
               "Accept": "*/*",
               "Content-Type": "application/x-amz-json-1.1",
                "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
            },
            body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        const token_object = {}
        token_object[username] = { 
            access: data['AuthenticationResult']['AccessToken'], 
            id: data['AuthenticationResult']['IdToken'],
            refresh: data['AuthenticationResult']['RefreshToken'],
        }
        enc.saveTokensToFile(token_object);

        return data;

    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }

}


export async function testToken(apiUrl, token_access) {
    try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            'Authorization': `${token_access}`
          },
          //send dummy graphql, we only care if it gives us an ok response
          body: JSON.stringify({query: mutation_sales, variables: dummy_sales_variables})
        });
        let res = await response.json();

        if (response.status == 401) {
            //401 specifically is the unauthorized error, which is the exact one we need to know it's our tokens that are the problem
            return false;
        }
        else if (response.ok) {
            return true;
        } 
        else {
            throw new Exception("response edge case detected: " + res);
        }

      } catch (error) {
        console.log(error);
        return false;
    }
}


export async function authenticateUser(username, password, cognitoUrl, cognitoClientId, authFlow, apiUrl) {
    //if token saved is still valid
    //need only the access token for now. Need to do cognito research to see how can use the ID and refresh tokens appropriately
    let token_object = enc.loadTokensFromFile();
    let token = token_object[username]['access']
    let does_token_work = await testToken(apiUrl, token);

    //if token is invalid or if no token available
    if (!does_token_work) {
        token = receiveToken(username, password, cognitoUrl, cognitoClientId, authFlow);
    }

    return token
}
