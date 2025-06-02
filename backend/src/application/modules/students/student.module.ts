import { Module } from '@nestjs/common';
import { StudentPostgresqlRepository } from '@infrastructure/database/sql/prisma/repositories/student.repository';
import { CryptoModule } from '@infrastructure/crypto/crypto.module';
import { CreateStudentUseCase } from './usecases/create-student.usecase';
import { StudentController } from './controllers/student.controller';
import { UpdateStudentUseCase } from './usecases/update-student.usecase';

@Module({
    controllers: [StudentController],
    imports: [CryptoModule],
    providers: [
        {
            provide: 'StudentRepository',
            useClass: StudentPostgresqlRepository,
        },
        CreateStudentUseCase,
        UpdateStudentUseCase,
    ],
    exports: ['StudentRepository'],
})
export class StudentModule {}
