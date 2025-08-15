const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substring(0, 16);
var decryptedMessage = decrypt(
  "yUCUCcaOaNvBTNYOqjxtn2+QGfWDkHuxTVLVU/YS/pk77mDiBwsK7HkcDSHU53XPwKIafFJyiFzjmZ1tmPjq2umPcKmt5CFyp8B2NErel5os07pkwv929/4Yp43pUFdx",
  encryptionMethod,
  secretKey,
  iv
);
//create Payment response check
const responseParameters =
  "000|success|https://hima-hub.herokuapp.com/checkout/5967d171-1367-11ef-91be-f98825e71ecd";
//console.log(encryptedMessage);
if (responseParameters === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
