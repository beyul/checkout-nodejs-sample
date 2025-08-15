# Bhutan Payments Checkout API

A Node.js code sample demonstrating integration with the Bhutan Payments checkout API, including payment encryption, decryption, and response verification.

## Overview

This project provides sample implementations for:

- Payment data encryption for secure transmission
- Payment response decryption and verification
- Payment status checking and validation
- Response parameter validation

## Features

- **Secure Encryption/Decryption**: Uses AES encryption for secure payment data transmission
- **Payment Response Verification**: Validates payment responses to ensure data integrity
- **Status Checking**: Decrypts and parses payment status information
- **Environment Configuration**: Uses dotenv for secure credential management

## Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd checkout-nodejs-sample
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
SECRET_KEY=your_32_character_secret_key_here
ECNRYPTION_METHOD=aes-256-cbc
```

## Project Structure

```
├── package.json                              # Project configuration and dependencies
├── lib.js                                   # Core encryption/decryption utilities
├── encrypt.js                               # Payment data encryption example
├── create-payment-response-verification.js  # Payment response verification
├── check-payment-status-decrypt.js          # Payment status checking and decryption
├── payment-success-decrypt.js               # Success response decryption and validation
└── import.js                                # Import/export examples
```

## Usage

### 1. Encrypting Payment Data

```bash
node encrypt.js
```

This script demonstrates how to encrypt payment parameters including:

- Amount
- Currency (USD)
- Success URL
- Cancel URL
- Order ID

### 2. Verifying Payment Response

```bash
node create-payment-response-verification.js
```

Verifies a payment response by:

- Decrypting the encrypted response data
- Comparing with expected response parameters
- Validating data integrity

### 3. Checking Payment Status

```bash
node check-payment-status-decrypt.js
```

Decrypts and displays payment status information including:

- Web Payment ID
- Order ID
- Payment Status (pending/succeeded/failed)
- Status descriptions

### 4. Success Response Validation

```bash
node payment-success-decrypt.js
```

Validates payment success responses by:

- Parsing URL parameters
- Decrypting encrypted data
- Comparing with formed check string
- Confirming data validity

## Key Components

### lib.js

Core utility functions for encryption and decryption:

- `encrypt(plainText, method, secret, iv)`: Encrypts data using AES
- `decrypt(encryptedData, method, secret, iv)`: Decrypts data using AES

### Environment Variables

- `SECRET_KEY`: 32-character secret key for encryption/decryption
- `ECNRYPTION_METHOD`: Encryption method (typically 'aes-256-cbc')

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit your `.env` file** - Add it to `.gitignore`
2. **Use strong secret keys** - Generate cryptographically secure 32-character keys
3. **Validate all responses** - Always verify encrypted data before processing
4. **Use HTTPS in production** - Ensure secure transmission
5. **Implement proper error handling** - Don't expose sensitive information in errors

## API Response Format

### Encrypted Payment Status Response

```json
{
  "code": "000",
  "message": "success",
  "encrypted-data": "base64_encoded_encrypted_string"
}
```

### Decrypted Payment Data Structure

```json
{
  "webPaymentId": {
    "id": "payment_id"
  },
  "orderId": "order_identifier",
  "paymentStatus": {
    "status": "pending|succeeded|failed"
  }
}
```

## Status Codes

| Status      | Meaning                             |
| ----------- | ----------------------------------- |
| `pending`   | ⏳ Payment is still being processed |
| `succeeded` | ✅ Payment completed successfully   |
| `failed`    | ❌ Payment failed                   |

## Error Handling

The scripts include error handling for:

- Invalid encrypted data
- Malformed JSON responses
- Missing environment variables
- Decryption failures

## Development

### Running Tests

```bash
npm test
```

_Note: No tests are currently configured. To add tests, update the test script in package.json._

### Adding New Features

1. Follow the existing code structure
2. Use the `lib.js` utilities for encryption/decryption
3. Include proper error handling
4. Add environment variable configuration as needed

## Dependencies

- `dotenv`: Environment variable management for secure configuration

## License

ISC

## Author

Bhuwan Singh Gurung

## Support

For issues and questions related to the Bhutan Payments API integration, please refer to the official API documentation or contact the payment provider's support team.
