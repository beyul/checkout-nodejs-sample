const { decryptSecretKey } = require("./lib");
let encryptedSecretKey =
  "1b762035ad33f8e3dc01d0adcf63136abdf7486d2def3d1ab7e3e945c830ba86";
let s = decryptSecretKey({
  content: encryptedSecretKey,
  iv: "5507a343819c181885bccc22facee88f",
});

console.log(s);
