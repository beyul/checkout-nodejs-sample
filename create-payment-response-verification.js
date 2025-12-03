const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substring(0, 16);
var decryptedMessage = decrypt(
  "qy60Ik0aItdB1t/i4bY3wE2+65uUeeQcOe5vH6kviUiWrNEEAMOJW8vy4trYyyriuFjtzWSBenlhf9rgnh9sstTVv6bGBD0U2G+OIpFVBSY=",
  encryptionMethod,
  secretKey,
  iv
);
//create Payment response check
const responseParameters =
  "000|success|http://localhost:3000/checkout/e272f0c1-a559-11ee-9bb8-4754aca5a9f9";
//console.log(encryptedMessage);
if (responseParameters === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
