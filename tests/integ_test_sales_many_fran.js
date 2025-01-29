const api = require("api_sales_app");
import { load_env_vars, set_single_env_var } from "../modules/dotenv_wrapper";
import {upload} from "../main.js"

// Load environment variables from .env file
//for testing ; these env variables are only in the dev environment
load_env_vars();
const secret_key = process.env.SECRET_KEY; 
const username = process.env.COGNITO_ACCOUNT;
const password = process.env.COGNITO_ACCOUNT_PWD;

let franID 
franchisee_ids = ["199999", "188888", "177777"] //dummy numbers (in string format)
const files = [ '/path/to/files/sales_upload_for_199999.csv',
                '/path/to/files/sales_upload_for_188888.csv',
                '/path/to/files/sales_upload_for_177777.csv' ]

for (let i= 0; i < franchisee_ids.length; i++){
    set_single_env_var("FRAN_ID", franchisee_ids[i])
    franID = process.env.FRAN_ID;
    load_env_vars();
    let response = await upload("sales", files[i], franID, username, password, secret_key);
    console.log(response);
}

