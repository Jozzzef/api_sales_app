import {sales} from "./modules/sales.js"
import {ppr} from "./modules/ppr.js"
import fs, { read } from 'fs';
import readline from 'readline';
import { set_single_env_var } from "./modules/dotenv_wrapper.js";

let struct_upload_types = ["sales", "ppr"]


/**
 * The main entry point, a single function for both the main use cases
 * there are currently two possible values for the type param: "sales" & "ppr"
 * ppr is still currently under development
 * the upload fucntionality takes a csv file on your end and uploads it to the AGI sales app
 */
export async function upload(type=struct_upload_types[0], 
                            file_path, 
                            franchisee_id, 
                            username, 
                            password,
                            secret_key) {
    //call specific function expressed in type 
    switch (type) {
        case struct_upload_types[0]:  
            let res = await sales(file_path, franchisee_id, username, password, secret_key);
            if (res.status) {
                throw new Error("status: Uncaught error in uploading; please check graphql endpoint")
            } else if (res.data.submitSales.status) {
                console.log("Status:", res.data.submitSales.status);
                return res.data.submitSales.status
            } 
            if (res.error) {
                throw new Error(res.error)
            } else if (res.data.submitSales.error) {
                    throw new Error("status: Uncaught error in uploading; please check graphql endpoint")
            }
            return res
        case struct_upload_types[1]:
            return await ppr(file_path, franchisee_id, username, password, secret_key);
    }
}

export function set_env_var(
    ENCRYPTION_KEY=null,
    SECRET_KEY=null,
    COGNITO_ACCOUNT=null,
    COGNITO_ACCOUNT_PWD=null,
    FRAN_ID=null,
    mode=["script", "interactive", "change_FRAN_ID"][0]){

    if (mode == "change_FRAN_ID") {
        if (change_FRAN_ID) { 
            set_single_env_var("FRAN_ID", FRAN_ID)
            return null
        } else{ throw new Error('Missing required FRAN_ID'); }
    }
    else if (mode == "script" 
            && (!ENCRYPTION_KEY 
                || !SECRET_KEY 
                || !COGNITO_ACCOUNT 
                || !COGNITO_ACCOUNT_PWD 
                || !FRAN_ID) ) {
        throw new Error('Missing required environment variables');
    } else if (mode == "interactive") {
        const rl = readline.createInterface({
            in: process.stdin,
            out: process.stdout
        })
        rl.question('Enter ENCRYPTION_KEY: ', input1 => {
         ENCRYPTION_KEY = input1;
         rl.question('Enter SECRET_KEY: ', input2 => {
           SECRET_KEY = input2;
           rl.question('Enter COGNITO_ACCOUNT: ', input3 => {
             COGNITO_ACCOUNT = input3;
             rl.question('Enter COGNITO_ACCOUNT_PWD: ', input4 => {
               COGNITO_ACCOUNT_PWD = input4;
               rl.question('Enter FRAN_ID: ', input5 => {
                 FRAN_ID = input5;
                 rl.close();
               });
             });
           });
         });
        });
    }

    const env_data = `ENCRYPTION_KEY=${ENCRYPTION_KEY}
    SECRET_KEY=${SECRET_KEY}
    COGNITO_ACCOUNT=${COGNITO_ACCOUNT}
    COGNITO_ACCOUNT_PWD=${COGNITO_ACCOUNT_PWD}
    FRAN_ID=${FRAN_ID}`;
    fs.writeFileSync('./.env', env_data);
    return null
}
