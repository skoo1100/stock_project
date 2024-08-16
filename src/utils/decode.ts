import CryptoJS from 'crypto-js';

export const aes256Decode = (iv: string, key: string, encryptedData: string) => {
  if (iv === '' || key === '' || encryptedData === undefined) {
    return '';
  }

  // Convert to proper CipherParams object if necessary
  const encryptedDataObj = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
  });

  // AES-256
  const cipher = CryptoJS.AES.decrypt(encryptedDataObj, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  const decodeData = cipher.toString(CryptoJS.enc.Utf8);

  return decodeData;
};
