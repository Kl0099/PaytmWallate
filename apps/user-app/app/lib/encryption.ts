import Cryptr from "cryptr";
const SECRETE = "myTotallySecretKey";
const cryptr = new Cryptr(SECRETE, { saltLength: 10 });

export const encryption = (value: string): string => {
  try {
    const encryptedString = cryptr.encrypt(value);
    return encryptedString;
  } catch (error) {
    return "error while encrypting";
  }
};
export const decryption = (encrpted: string): string => {
  try {
    const decryptedString = cryptr.decrypt(encrpted);
    return decryptedString;
  } catch (error) {
    return "error while decrypting";
  }
};

export const validateUser = (value: string): boolean => {
  let newData = value.split("&number=");

  // Check if newData array has exactly two parts
  if (newData.length === 2) {
    // Extract the UUID part (newData[0]) and the phone number part (newData[1])
    const uuidPart = newData[0] || "";
    const phoneNumber = newData[1] || "";

    // Check if uuidPart is a valid UUID and phoneNumber is exactly 10 characters and consists only of digits
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        uuidPart
      ) &&
      /^\d{10}$/.test(phoneNumber)
    ) {
      return true; // Valid format
    }
  }

  return false; // Invalid format or missing parts
};
