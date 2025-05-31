import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { StudentRepository } from '../../students/repositories/student.repository';
import { CryptoRepository } from '@infrastructure/crypto/crypto.repository';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        @Inject('CryptoRepository')
        private readonly cryptoRepository: CryptoRepository,
    ) {}

    public async execute(loginData: LoginDto) {
        const student = await this.studentRepository.findOne({
            where: { email: loginData.email },
        });

        if (!student) {
            throw new UnauthorizedException(this.getErrorMessage());
        }

        await this.validatePassword(loginData.password, student.getPassword());

        return { student };
    }

    private async validatePassword(plain: string, hashed: string) {
        const valid = await this.cryptoRepository.compare(plain, hashed);
        if (!valid) {
            throw new UnauthorizedException(this.getErrorMessage());
        }
    }

    private getErrorMessage() {
        return {
            message: 'Credenciais Inválidas!',
        };
    }
}
