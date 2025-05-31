import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './usecases/login.usecase';
import { StudentModule } from '../students/student.module';
import { GenerateAccessTokenUseCase } from './usecases/generate-acces-token.usecase';
import { AuthController } from './controllers/auth.controller';
import { CryptoModule } from '@root/src/infrastructure/crypto/crypto.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
        StudentModule,
        CryptoModule,
    ],
    providers: [LoginUseCase, GenerateAccessTokenUseCase, JwtStrategy],
})
export class AuthModule {}
