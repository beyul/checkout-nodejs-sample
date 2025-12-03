var crypto = require("crypto");
require("dotenv").config();
const algorithm = "aes-256-ctr";
const secretKey = process.env.DECIPHER_KEY;
var encrypt = function (plain_text, encryptionMethod, secret, iv) {
  var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
  return (
    encryptor.update(plain_text, "utf8", "base64") + encryptor.final("base64")
  );
};

var decrypt = function (encryptedMessage, encryptionMethod, secret, iv) {
  var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return (
    decryptor.update(encryptedMessage, "base64", "utf8") +
    decryptor.final("utf8")
  );
};

const decryptSecretKey = (hash) => {
  console.log(secretKey);
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

module.exports = {
  encrypt,
  decrypt,
  decryptSecretKey,
};
