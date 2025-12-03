                                                                                                  │ │
│ │ ## Example Encryption (Node.js)                                                                   │ │
│ │                                                                                                   │ │
│ │ ```javascript                                                                                     │ │
│ │ const crypto = require('crypto');                                                                 │ │
│ │                                                                                                   │ │
│ │ // Configuration                                                                                  │ │
│ │ const secretKey = process.env.SECRET_KEY; // From API Key                                         │ │
│ │ const encryptionMethod = 'aes-256-cbc';                                                           │ │
│ │ const iv = secretKey.substr(0, 16);                                                               │ │
│ │                                                                                                   │ │
│ │ // Prepare data                                                                                   │ │
│ │ const amount = 2999; // $29.99 in cents                                                           │ │
│ │ const currency = 'USD';                                                                           │ │
│ │ const interval = 'MONTHLY';                                                                       │ │
│ │ const intervalCount = 1;                                                                          │ │
│ │ const successUrl = 'https://merchant.com/success';                                                │ │
│ │ const cancelUrl = 'https://merchant.com/cancel';                                                  │ │
│ │ const customerEmail = 'customer@example.com';                                                     │ │
│ │ const customerName = 'John Doe';                                                                  │ │
│ │ const externalId = 'sub_12345';                                                                   │ │
│ │ const metadata = JSON.stringify({                                                                 │ │
│ │   plan: 'premium',                                                                                │ │
│ │   trial_days: 30,                                                                                 │ │
│ │   referral_code: 'FRIEND2024'                                                                     │ │
│ │ });                                                                                               │ │
│ │                                                                                                   │ │
│ │ // Build pipe-delimited string                                                                    │ │
│ │ const text = `${amount}|${currency}|${interval}|${intervalCount}|${successUrl}|${cancelUrl}|${cus │ │
│ │ tomerEmail}|${customerName}|${externalId}|${metadata}`;                                           │ │
│ │                                                                                                   │ │
│ │ // Encrypt                                                                                        │ │
│ │ function encrypt(text, method, key, iv) {                                                         │ │
│ │   const cipher = crypto.createCipheriv(method, Buffer.from(key), Buffer.from(iv));                │ │
│ │   let encrypted = cipher.update(text, 'utf8', 'base64');                                          │ │
│ │   encrypted += cipher.final('base64');                                                            │ │
│ │   return encrypted;                                                                               │ │
│ │ }                                                                                                 │ │
│ │                                                                                                   │ │
│ │ const encryptedData = encrypt(text, encryptionMethod, secretKey, iv);                             │ │
│ │                                                                                                   │ │
│ │ // Send request                                                                                   │ │
│ │ const response = await fetch('https://api.payment-system.com/api/v1/recurring-payments', {        │ │
│ │   method: 'POST',                                                                                 │ │
│ │   headers: {                                                                                      │ │
│ │     'Authorization': `Bearer ${apiKey}`,                                                          │ │
│ │     'Content-Type': 'application/json'                                                            │ │
│ │   },                                                                                              │ │
│ │   body: JSON.stringify({ encrypted_data: encryptedData })                                         │ │
│ │ });                                                                                               │ │
│ │ ```                                                                                               │ │
│ │                                                                                                   │ │
│ │ ## Minimal Example (Required Fields Only)                                                         │ │
│ │                                                                                                   │ │
│ │ ```javascript                                                                                     │ │
│ │ // Minimum required fields (indices 0-6)                                                          │ │
│ │ const text = `2999|USD|MONTHLY|1|https://merchant.com/success|https://merchant.com/cancel|custome │ │
│ │ r@example.com`;                                                                                   │ │
│ │                                                                                                   │ │
│ │ const encryptedData = encrypt(text, encryptionMethod, secretKey, iv);                             │ │
│ │ ```
