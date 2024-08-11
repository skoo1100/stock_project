import CryptoJS from 'crypto-js';

const escapable = /[\x00-\x1f\ud800-\udfff\u200c\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;

export const filterUnicode = (quoted: string) => {
  escapable.lastIndex = 0;
  if (!escapable.test(quoted)) return quoted;

  return quoted.replace(escapable, () => {
    return '';
  });
};

export const aes256Decode = (iv: string, key: string, encryptedData: string) => {
  console.log('');
  console.log('[aes256Decode] : [start]');
  console.log('[Key]  : ' + iv);
  console.log('[Iv]   : ' + iv);
  console.log('[Data] : ' + encryptedData);

  // AES-256
  const cipher = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // UTF-8
  const decodedData = cipher.toString(CryptoJS.enc.Utf8);
  console.log('[aes256Decode] : [decode]');
  console.log('[data] : ' + decodedData);
  console.log('');

  return decodedData;
};
