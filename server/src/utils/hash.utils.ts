import * as bcrypt from 'bcrypt';

export class Hash {
  public static bcrypt(word: string, saltOrRounds = 10): Promise<string> {
    return bcrypt.hash(word, saltOrRounds);
  }
}
