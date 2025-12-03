const { decrypt } = require("./lib");
const url = require("url");
// Replace the URL parameter with resposne url
const current_url = new URL(
  "http://localhost:4200/?status=000&amount=100&code=CK-274232&accessKey=a2f41ac1-7137-11ed-81da-33e2a4158e8d&transactionId=pi_3MA5AaKHzhDqOyh90c1ESZlK&orderId=DOI2022-12-01T05%3A15%3A40&encrypted-data=%2Fb8Bcu8t%2B8hzCyUEIgoT%2BfP4tZxsRWJQjfK5cJboyFOBVIPnGiavvlUOTh0x8SKP6CIs7aS7ZP2nGghF5be2laxCtkleNu6hhxsxJXxORwCkv%2BVkNU7dDBWUjgVNOZ0%2BjQVrFkrhQRTsMxILonJ9JA%3D%3D&metadata=%7B%7D"
);
const params = current_url.searchParams;

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);

//decrypt the message
var decryptedMessage = decrypt(
  params.get("encrypted-data"),
  encryptionMethod,
  secretKey,
  iv
);

//console.log(decryptedMessage);

//Form check string
const checkString = `${
  params.get("status") +
  "|" +
  params.get("amount") +
  "|" +
  (params.get("code") + "|" + params.get("accessKey")) +
  "|" +
  params.get("transactionId") +
  "|" +
  params.get("orderId") +
  "|" +
  params.get("metadata")
}`;

//console.log(encryptedMessage);
if (checkString === decryptedMessage) {
  console.log("💰 Data is valid");
} else {
  console.log("❌data is invalid");
}
