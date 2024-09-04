import * as crypto from 'crypto';
import { Encryption } from './interface/i.encryption';

export class ShaEncryptionService implements Encryption {
  encrypt(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
  }
}
