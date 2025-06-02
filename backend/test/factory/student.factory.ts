import { faker } from '@faker-js/faker';
import { StudentEntity } from '@application/modules/students/entities/student.entity';
import { StudentRepository } from '@application/modules/students/repositories/student.repository';
import { CryptoRepository } from '@infrastructure/crypto/crypto.repository';

interface StudentFactoryData {
    password?: string;
    email?: string;
}

export class StudentFactory {
    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly hashRepository: CryptoRepository,
    ) {}

    public async create({ email, password: secret }: StudentFactoryData) {
        const student = new StudentEntity();
        student.setEmail(email ?? faker.internet.email());
        const password = await this.hashRepository.hash(
            secret ?? faker.string.alphanumeric(15),
        );
        student.setPassword(password);
        student.name = faker.person.fullName();
        student.lastName = faker.person.lastName();

        return this.studentRepository.save(student);
    }
}
