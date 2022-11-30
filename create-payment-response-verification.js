const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substring(0, 16);
var decryptedMessage = decrypt(
  "c9OrnfeZ8T7e0KzWwxUQKPJK+no+/6ASHI3R/IiavOYujxT8wacssOu+Kjjory74TyBqCSQODq6GCshhQwH1Mbbtj+l/UpIxiFwVe0OwtVw=",
  encryptionMethod,
  secretKey,
  iv
);
//create Payment response check
const responseParameters =
  "000|success|http://localhost:3000/checkout/00a9a8f0-708a-11ed-82bb-515f3419a744";
//console.log(encryptedMessage);
if (responseParameters === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
