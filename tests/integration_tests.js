import upload from "../main.js"
import dotenv from 'dotenv';
const __dirname = import.meta.dirname;

// Load environment variables from .env file
dotenv.config({ path: __dirname+"/../.env" });
//for testing
const username = process.env.COGNITO_TEST_ACCOUNT;
const password = process.env.COGNITO_TEST_ACCOUNT_PWD;

//upload()