const { decrypt } = require("./lib");
require("dotenv").config();

// Replace with your API response encrypted-data
const apiResponse = {
  code: "000",
  message: "success",
  "encrypted-data":
    "ku/Sn4dHJgQbGiU33S9ZmQyvP2HdWiQBU3gRjjpFD/sgbh2Oej1qPEdWAJ017u+WIpBQR1WjGkLKuUIOsWtTnUxR81U8r6DIHlreiyu84IKPo55LfCliVHiNDnVLrTrRHBv9TJ/yrqGDdZ+djgWUOuZm7aUXkxz+auj4H2GFabbOge5dHock0tjv/7w3nyYDCKrtx9isla66oytmKGoziYuR24TpIM6GcAueL5U37iAFH2/ScUQPrEqO1sTc8abFDFDIKirh7V9ya1vV4sYc3fxtJnWU6s2XzL9Mvg0evTmnE9JZI25E1YVv4MFRu6yiClZ6cOc7+qpO7cvJ+badiKzgCPN08lQAdZfmXylkd7qPp/jWFbXzDSc00sr0TLN6T023lOUOpLD3BccWecuQMui4WJonhvXC2VWrMOxgBSg=",
};

const secretKey = process.env.SECRET_KEY;
var encryptionMethod = process.env.ECNRYPTION_METHOD;
var iv = secretKey.substr(0, 16);

try {
  // Decrypt the message
  var decryptedMessage = decrypt(
    apiResponse["encrypted-data"],
    encryptionMethod,
    secretKey,
    iv
  );
  console.log("📄 Decrypted Raw Message:", decryptedMessage);
  // Parse JSON response
  const paymentStatusData = JSON.parse(decryptedMessage);
  console.log("");
  console.log("✅ Decrypted Payment Status Data:");

  if (paymentStatusData.webPaymentId) {
    console.log("💳 Web Payment ID:", paymentStatusData.webPaymentId.id);
  } else {
    console.log("💳 Web Payment ID: Not found");
  }
  if (paymentStatusData.orderId) {
    console.log("💳 Order ID:", paymentStatusData.orderId);
  } else {
    console.log("💳 Order ID: Not found");
  }

  if (paymentStatusData.paymentStatus) {
    console.log("📊 Payment Status:", paymentStatusData.paymentStatus.status);

    // Show status meaning
    const statusMeaning = {
      pending: "⏳ Payment is still being processed",
      succeeded: "✅ Payment completed successfully",
      failed: "❌ Payment failed",
    };

    const status = paymentStatusData.paymentStatus.status;
    console.log(
      "📝 Status Meaning:",
      statusMeaning[status] || "❓ Unknown status"
    );
  } else {
    console.log("📊 Payment Status: Not found");
  }
} catch (error) {
  console.error("Error:", error.message);
}
