import { SHA256 } from 'crypto-js';

export function CalculateHash(
  prevHash: string,
  data: any,
  timeStamp: Date,
): string {
  let hash = '';
  let nonce = 1;
  while (!hash.startsWith('0000')) {
    nonce++;
    const dataString =
      prevHash + JSON.stringify(data) + timeStamp.toISOString() + nonce;
    hash = SHA256(dataString).toString();
  }
  return hash;
}
