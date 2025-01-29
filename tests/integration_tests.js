// Example of how to use the Sales upload() functionality
import { load_env_vars } from "../modules/dotenv_wrapper";
import {upload} from "../main.js"

// Load environment variables from .env file
//for testing ; these env variables are only in the dev environment
load_env_vars();
const secret_key = process.env.SECRET_KEY; 
const username = process.env.COGNITO_ACCOUNT;
const password = process.env.COGNITO_ACCOUNT_PWD;
const franID = process.env.FRAN_ID;
const file = '/path/to/files/sales_upload_for_199999.csv'

const async_wrapper = async () => {
    let response = await upload("sales", file, franID, username, password, secret_key);
    console.log(response);
}
async_wrapper();
