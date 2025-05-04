import Crypto from "crypto-js";

export const useCrypto = () => {
  const encryption = (data, authId) => {
    const encryptedData = Crypto.AES.encrypt(
      JSON.stringify(data),
      authId + import.meta.env.VITE_CRYPTO_SECRET_CLIENT_KEY
    ).toString();
    return encryptedData;
  };
  const decryption = (encryptedData, authId) => {
    const bytes = Crypto.AES.decrypt(
      encryptedData,
      authId + import.meta.env.VITE_CRYPTO_SECRET_CLIENT_KEY
    );
    return bytes.toString(Crypto.enc.Utf8)
      ? JSON.parse(bytes.toString(Crypto.enc.Utf8))
      : null;
  };

  return { encryption, decryption };
};
