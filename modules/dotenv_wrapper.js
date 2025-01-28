import dotenv from 'dotenv';
export function load_env_vars(location) {
    dotenv.config({ path: location })
}

