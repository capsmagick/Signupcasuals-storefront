const path = require("path");
const fs = require("fs");

const env = process.env.NODE_ENV;
console.log("env",env)
const envPath = path.resolve(__dirname, `.env.${env}`);
const defaultEnvPath = path.resolve(__dirname,".env.development");

require("dotenv").config({
    path: fs.existsSync(envPath) ? envPath : defaultEnvPath
})

console.log(process.env.API_URL)