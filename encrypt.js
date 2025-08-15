const { encrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
const orderId = "DOI" + new Date().toISOString().substr(0, 19);

const text =
  "150.25" +
  "|" +
  "USD" +
  "|" +
  "http://localhost:4200" +
  "|" +
  "http://localhost:4200" +
  "|" +
  orderId;

var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);

var encryptedMessage = encrypt(text, encryptionMethod, secretKey, iv);

console.log(encryptedMessage);
