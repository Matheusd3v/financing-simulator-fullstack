import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CryptoRepository } from '../crypto.repository';

@Injectable()
export class BcryptRepository implements CryptoRepository {
    public async hash(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
