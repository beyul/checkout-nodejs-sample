const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substring(0, 16);
var decryptedMessage = decrypt(
  "6pm0MM3CCFn3OzxO3kOs7ZGiKi6aKIxYFoXt/Y2uZN8plJvrVxMk/ttJykQpWY9TwOAx8kAohNubJ8IBmiWxwLkO+1Fig6khYEsYxrDPfvg=",
  encryptionMethod,
  secretKey,
  iv,
);


console.log(decryptedMessage)
//create Payment response check
const responseParameters =
  "000|success|http://localhost:3000/checkout/e272f0c1-a559-11ee-9bb8-4754aca5a9f9";
//console.log(encryptedMessage);
if (responseParameters === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
