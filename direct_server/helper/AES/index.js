const Crypto = require("crypto-js");
module.exports.encryption = (data, authId) => {
  const encryptedData = Crypto.AES.encrypt(
    JSON.stringify(data),
    authId + process.env.VITE_CRYPTO_SECRET_CLIENT_KEY
  ).toString();
  return encryptedData;
};
module.exports.decryption = (encryptedData, authId) => {
  const bytes = Crypto.AES.decrypt(
    encryptedData,
    authId + process.env.VITE_CRYPTO_SECRET_CLIENT_KEY
  );
  return bytes.toString(Crypto.enc.Utf8);
};
