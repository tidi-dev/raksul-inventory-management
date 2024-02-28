import * as crypto from 'crypto';

export function encryptPhone(phone_number: string): string {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPT_KEY),
    getEncryptIV(),
  );
  let encrypted = cipher.update(phone_number);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

export function decryptPhone(phone_number: string): string {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPT_KEY),
    getEncryptIV(),
  );
  let decrypted = decipher.update(Buffer.from(phone_number, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function getEncryptIV(): Buffer {
  return Buffer.from(process.env.ENCRYPT_IV, 'hex');
}
