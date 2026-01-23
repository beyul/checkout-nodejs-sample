const { decryptSecretKey } = require("./lib");
let encryptedSecretKey =
  "6pm0MM3CCFn3OzxO3kOs7ZGiKi6aKIxYFoXt/Y2uZN8plJvrVxMk/ttJykQpWY9TwOAx8kAohNubJ8IBmiWxwLkO+1Fig6khYEsYxrDPfvg=";
let s = decryptSecretKey({
  content: encryptedSecretKey,
  iv: "5507a343819c181885bccc22facee88f",
});

console.log(s);
