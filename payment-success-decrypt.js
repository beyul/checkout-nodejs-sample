const { decrypt } = require("./lib");
const url = require("url");
// Replace the URL parameter with resposne url
const current_url = new URL(
  "http://localhost:4200/?status=000&amount=100&code=CK-88D09A&accessKey=00a9a8f0-708a-11ed-82bb-515f3419a744&transactionId=pi_3M9lllKHzhDqOyh90qWCceNa&orderId=DOI2022-11-30T08%3A35%3A09&encrypted-data=JhVXnyHRQjzd5zmiOK0IMX9fbiYudYcRU4xi2N9DZTOGzadvLruPfjFtKw1cI1WcqSJ8W8g2JjZfswm7eXvI9%2FMbClpC6hbuA6Mkb9pWm%2FGfHNhFX4jo%2FtdSX86md6CDCVbgfe6R9NaOMOCayV34vg%3D%3D&metadata=%7B%7D"
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
