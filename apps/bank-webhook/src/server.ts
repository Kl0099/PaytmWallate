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

const value = "hello world";
const encrypt = encryption(value);
const decrypt = decryption("faltu");

console.log(decrypt);
