import {sales} from "./modules/sales.js"
import {ppr} from "./modules/ppr.js"
import fs from 'fs';

let struct_upload_types = ["sales", "ppr"]

export async function upload(type=struct_upload_types[0], 
                            file_path, 
                            franchisee_id, 
                            username, 
                            password,
                            secret_key) {
    //call specific function expressed in type
    switch (type) {
        case struct_upload_types[0]:  
            return await sales(file_path, franchisee_id, username, password, secret_key);
        case struct_upload_types[1]:
            return await ppr(file_path, franchisee_id, username, password, secret_key);
    }
}

export function set_env_var(
    ENCRYPTION_KEY,
    SECRET_KEY,
    COGNITO_TEST_ACCOUNT,
    COGNITO_TEST_ACCOUNT_PWD,
    FRAN_ID){

    const env_data = `ENCRYPTION_KEY=${ENCRYPTION_KEY}
    SECRET_KEY=${SECRET_KEY}
    COGNITO_TEST_ACCOUNT=${COGNITO_TEST_ACCOUNT}
    COGNITO_TEST_ACCOUNT_PWD=${COGNITO_TEST_ACCOUNT_PWD}
    FRAN_ID=${FRAN_ID}`;

    fs.writeFileSync('./.env', env_data);
}
