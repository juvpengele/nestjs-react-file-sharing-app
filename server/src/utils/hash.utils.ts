import * as bcrypt from "bcrypt";

export class Hash {
    public static bcrypt(word: string): Promise<string> {
        const saltOrRounds = 10;
        return bcrypt.hash(word, saltOrRounds);
    }
}