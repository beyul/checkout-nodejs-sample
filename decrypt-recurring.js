const { encrypt, decrypt } = require("./lib");
// Sample configuration - Replace with your actual API key and secret
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;
const IV = SECRET_KEY.substring(0, 16); // First 16 characters as IV

/**
 * Decrypt recurring payment data (for verification)
 */
function decryptRecurringPayment(encryptedData) {
  var encryptionMethod = process.env.ECNRYPTION_METHOD;

  let decrypted = decrypt(encryptedData, encryptionMethod, SECRET_KEY, IV);

  return decrypted;
}

console.log(
  decryptRecurringPayment(
    "dkWbgtgAzBfJsD89Seqf7f8Dtb8usg8ortaeVEWdinZv26pF5yDg/Zt8vMg5OQdwr2VmfBPQFz85nU5QHJEMuArklvb+3P8TSMQ9ePv1ruPMXPJn5uodk4JTW0XhR3eU",
  ),
);
