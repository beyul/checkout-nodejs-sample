const { decrypt } = require("./lib");

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);
var decryptedMessage = decrypt(
  "jLs4w7xjbLNhN2u1opC93MhBnA5EgJhEg/XHbM81t3Oryc12or7jlG05DkgHggpemYqiuqQaMpXlIU5h82eXMvMwtnknNaj0XSU0KJO/YJwsCssKxLcbd+iYfh+MYoEZwLe6WOzHXz5TIT4xMx8L8g==",
  encryptionMethod,
  secretKey,
  iv
);

console.log(decryptedMessage);

//Payment success response check
const params =
  "000|500|CK-140916|27a235e1-580b-11ed-b974-eb3238db30fe|pi_3LyT7JKHzhDqOyh90PJzZHSA|DOI2022-10-30T04:27:09|{}";
//console.log(encryptedMessage);
if (params === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
