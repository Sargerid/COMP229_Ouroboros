require('dotenv').config();
const fs = require('fs');

// copy the dist of the client
fs.cpSync(`./${process.env.CLIENT_DIRECTORY ?? 'client'}/dist`, './public/', { recursive: true });

//
// sanity check before running the server
//

let envError = false;
if (!process.env.MONGO_CONNECTION) {
    console.error('Variable MONGO_CONNECTION was not specified in .env file');
    envError = true;
}

if (!process.env.JWT_SECRET) {
    console.error('Varabile JWT_SECRET was not specified in the .env file, you can generate one with "npm run generate-jwt"');
    envError = true;
}

if (!process.env.JWT_COOKIE_EXPIRE) {
    console.error('Varabile JWT_COOKIE_EXPIRE was not specified in the .env file, consider using 604800000 as a default (7 days)');
    envError = true;
}

if (envError) {
    throw new Error(".env file is configured incorrectly, please correct this before running again");
}