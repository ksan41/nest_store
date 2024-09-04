export interface Encryption {
  encrypt(text: string): string;
  match(plainText: string, encryptText: string): boolean;
}
