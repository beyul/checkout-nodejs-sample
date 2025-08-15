var crypto = require("crypto");
require("dotenv").config();

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

module.exports = {
  encrypt,
  decrypt,
};
