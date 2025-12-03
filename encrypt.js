const isValidDomain = require("is-valid-domain");
const { encrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
const orderId = "DOI" + new Date().toISOString().substr(0, 19);

const text = `240.00|USD|https://www.google.com|https://www.google.com|${orderId}`;

var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);

var encryptedMessage = encrypt(text, encryptionMethod, secretKey, iv);

console.log(encryptedMessage);
