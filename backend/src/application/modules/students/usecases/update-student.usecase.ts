import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { StudentEntity } from '../entities/student.entity';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { CryptoRepository } from '@infrastructure/crypto/crypto.repository';

@Injectable()
export class UpdateStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        @Inject('CryptoRepository')
        private readonly cryptoRepository: CryptoRepository,
    ) {}

    public async execute(student: StudentEntity, updateBody: UpdateStudentDto) {
        await this.validateEmail(student, updateBody.email);

        student.setEmail(updateBody.email);
        student.name = updateBody.name;
        student.lastName = updateBody.lastName;

        if (updateBody.password) {
            const hashed = await this.cryptoRepository.hash(
                updateBody.password,
            );
            student.setPassword(hashed);
        }

        await this.studentRepository.update(student);
    }

    private async validateEmail(student: StudentEntity, newEmail: string) {
        if (student.getEmail() === newEmail) return;

        const existent = await this.studentRepository.findOne({
            where: { email: newEmail },
        });

        if (!existent) return;

        if (student.getId() !== existent.getId()) {
            throw new ConflictException({
                message: 'Esse email ja pertence a outro usuário!',
            });
        }
    }
}
