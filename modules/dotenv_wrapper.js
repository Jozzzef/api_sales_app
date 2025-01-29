import dotenv from 'dotenv';
import fs from 'fs';

export function load_env_vars(location) {
    dotenv.config({ path: location })
}

export function set_single_env_var(VAR_WANT_TO_CHANGE, new_value){
    const env = dotenv.parse(fs.readFileSync('.env'));
    env[VAR_WANT_TO_CHANGE] = new_value;
    // Write back to file
    const envContent = Object.entries(env)
     .map(([key, val]) => `${key}=${val}`)
     .join('\n')
    fs.writeFileSync('.env', envContent)
}
