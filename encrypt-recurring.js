const { encrypt, decrypt } = require("./lib");
// Sample configuration - Replace with your actual API key and secret
const SECRET_KEY = process.env.SECRET_KEY;
const API_KEY = process.env.API_KEY;
console.log(SECRET_KEY);
const IV = SECRET_KEY.substring(0, 16); // First 16 characters as IV

// Sample recurring payment data
const recurringPaymentData = {
  amount: 40000, // Amount in cents (e.g., 29.99 USD)
  currency: "USD",
  interval: "MONTHLY", // DAILY, WEEKLY, MONTHLY, or YEARLY
  intervalCount: 1,
  successUrl: "https://example.com/success",
  cancelUrl: "https://example.com/cancel",
  customerEmail: "customer@example.com",
  customerName: "John Doe", // Optional
  externalId: "sub_123", // Optional - your subscription ID
  chargeImmidiately: true,
  description: "test charge",
  metadata: {
    // Optional
    plan: "premium",
    userId: "12345",
  },
};

/**
 * Encrypt recurring payment data
 * Format: amount|currency|interval|intervalCount|successUrl|cancelUrl|customerEmail|customerName|externalId|metadata
 */
function encryptRecurringPayment(data) {
  // Build the pipe-delimited string
  const parts = [
    data.amount.toString(),
    data.currency,
    data.interval,
    data.intervalCount.toString(),
    data.successUrl,
    data.cancelUrl,
    data.customerEmail,
    data.customerName || "", // Optional field
    data.externalId || "", // Optional field
    data.chargeImmidiately,
    data.description,
    data.metadata ? JSON.stringify(data.metadata) : "", // Optional field
  ];

  const plaintext = parts.join("|");

  console.log("Plaintext:", plaintext);
  console.log("");

  var encryptionMethod = process.env.ECNRYPTION_METHOD;

  var encryptedMessage = encrypt(plaintext, encryptionMethod, SECRET_KEY, IV);
  return encryptedMessage;
}

/**
 * Decrypt recurring payment data (for verification)
 */
function decryptRecurringPayment(encryptedData) {
  var encryptionMethod = process.env.ECNRYPTION_METHOD;

  let decrypted = decrypt(encryptedData, encryptionMethod, SECRET_KEY, IV);

  return decrypted;
}

// Main execution
console.log("=== Recurring Payment Encryption Example ===\n");

// Encrypt the data
const encryptedData = encryptRecurringPayment(recurringPaymentData);
console.log("Encrypted Data:", encryptedData);
console.log("");

// Verify by decrypting
const decryptedData = decryptRecurringPayment(encryptedData);
console.log("Decrypted (verification):", decryptedData);
console.log("");

// Prepare API request payload
const apiRequest = {
  encrypted_data: encryptedData,
};

console.log("=== API Request Payload ===");
console.log(JSON.stringify(apiRequest, null, 2));
console.log("");

// Example cURL command
console.log("=== Example cURL Command ===");
console.log(`curl -X POST http://localhost:8080/recurring-payments \\
  -H ": Bearer ${API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(apiRequest)}'`);
console.log("");

// Example response structure (what you'll receive back)
console.log("=== Expected Response Structure ===");
console.log(`{
  "encrypted_data": "base64_encrypted_response",
  "checkout_url": "https://checkout.bhutanpayments.com/recurring-checkout/session_id",
  "recurring_payment_id": "ulid_of_recurring_payment"
}`);
console.log("");

console.log("=== Decrypted Response Format ===");
console.log("Format: statusCode|message|checkoutURL|recurringPaymentId");
console.log(
  "Example: 000|success|https://checkout.example.com/session_xyz|01HXYZ123456789ABC",
);
