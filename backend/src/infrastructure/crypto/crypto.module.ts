import { Module } from "@nestjs/common";
import { BcryptRepository } from "./bcrypt/bcrypt.repository";

@Module({
    providers: [
        {
            provide: 'CryptoRepository', 
            useClass: BcryptRepository
        }
    ],
    exports: ['CryptoRepository']
})
export class CryptoModule {}