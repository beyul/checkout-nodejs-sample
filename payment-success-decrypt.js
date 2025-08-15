const { decrypt } = require("./lib");
const url = require("url");
// Replace the URL parameter with resposne url
const current_url = new URL(
  "http://localhost:4200/?status=000&amount=100&code=CK-903615&accessKey=7f666621-70a7-11ed-89c9-416c171689ad&transactionId=pi_3M9p46KHzhDqOyh9079Y9llt&orderId=DOI2022-11-30T12%3A04%3A29&encrypted-data=Srx%2FhuRHPN0GNYVf%2FgRrASJ85YImYliXu2y33AZOIjCI64%2F0m32tVXpqJ30O97aDjo4tNmmH%2FrxxmdTxvSsEz4bZeSG38sYtpsQl%2F2auAnLeFS30rH0zOvGlIZ0j02oSujmo4Ncy5KRCE5iLrv70pA%3D%3D&metadata=%7B%7D"
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
