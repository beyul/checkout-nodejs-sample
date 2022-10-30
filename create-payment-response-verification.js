const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);
var decryptedMessage = decrypt(
  "J/UW/CTXpf9Gm2vDTKyt9Kv62MsC0XOFf7qCxxlRyoWsbVqEZiJzSWtmuNeBkpTFpTtTaZWov99/2/ULF21uFDhkU46v6jlcjQqNJyLdrms=",
  encryptionMethod,
  secretKey,
  iv
);
//create Payment response check
const responseParameters =
  "000|success|http://localhost:3000/checkout/27a235e1-580b-11ed-b974-eb3238db30fe";
//console.log(encryptedMessage);
if (responseParameters === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
