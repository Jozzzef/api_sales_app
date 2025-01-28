// Example of how to use the Sales upload() functionality
import { load_env_vars } from "../modules/dotenv_wrapper";
const __dirname = import.meta.dirname;
import {upload} from "../main.js"

// Load environment variables from .env file
//for testing ; these env variables are only in the dev environment
load_env_vars(__dirname+"/../.env");
const secret_key = process.env.SECRET_KEY; 
const username = process.env.COGNITO_TEST_ACCOUNT;
const password = process.env.COGNITO_TEST_ACCOUNT_PWD;
const franID = process.env.FRAN_ID;
const filep = '/home/jozeflumaj/Desktop/api_sales_app/temp/sales_2024-02-04_1000588.csv'

const async_wrapper = async () => {
    let res = await upload("sales", filep, franID, username, password, secret_key);
    if (res.status) {console.log("Status:", "uncaught error in uploading");} 
    else if (res.data.submitSales.status) {console.log("Status:", res.data.submitSales.status);} 
    if (res.error) {console.log("Error:", res.error);}
    else if (res.data.submitSales.error) {console.log("Status:", error);} 
}
async_wrapper();
