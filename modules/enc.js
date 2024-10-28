import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
const __dirname = import.meta.dirname;
import dotenv from 'dotenv';

dotenv.config({ path: __dirname+"/../.env" });

// ENCRYPTION
// Configuration for encryption
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const init_vec_LENGTH = 16; // the 16 bytes/128 bits AES block size initialization vector; therefore uses cipher block chaining (CBC)

// encrypt text
export function encrypt(text) {
  const init_vec = crypto.randomBytes(init_vec_LENGTH); //generate the init vectors actual values
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), init_vec); //using a 256-bit key for encryption strength, the IV remains 128 bits because it only needs to be long enough to randomize the 128-bit blocks AES operates on.
  let encrypted = cipher.update(text); //written in chunks, saved to buffer
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return init_vec.toString('hex') + ':' + encrypted.toString('hex');
}

// decrypt text
export function decrypt(text) {
  const textParts = text.split(':');
  const init_vec = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), init_vec);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}



// READING & WRITING SAVED ENCRYPTED DATA
// Path to the file where tokens will be stored
export const TOKEN_FILE_PATH = path.join(__dirname, 'tokens.enc');

// save tokens to a file
// json it accepts as parameter is in the form {username:{access:token_jwt, id:token_jwt, refresh:token_jwt}}
export function saveTokensToFile(tokens) {
  const tokensString = JSON.stringify(tokens);
  const encryptedTokens = encrypt(tokensString);
  fs.writeFileSync(TOKEN_FILE_PATH, encryptedTokens, 'utf-8');
}

// load tokens from the file
export function loadTokensFromFile() {
  if (!fs.existsSync(TOKEN_FILE_PATH)) {
    return null; // No tokens saved yet
  }
  const encryptedTokens = fs.readFileSync(TOKEN_FILE_PATH, 'utf-8');
  const decryptedTokens = decrypt(encryptedTokens);
  return JSON.parse(decryptedTokens);
}