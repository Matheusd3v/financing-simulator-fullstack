import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { StudentRepository } from '@application/modules/students/repositories/student.repository';
import { AppModule } from '@application/app.module';
import { GenerateAccessTokenUseCase } from '@application/modules/auth/usecases/generate-acces-token.usecase';
import { StudentFactory } from '../factory/student.factory';
import { StudentEntity } from '@application/modules/students/entities/student.entity';
import { CryptoRepository } from '@infrastructure/crypto/crypto.repository';
import { CreateSimulationDto } from '@application/modules/financing-simulators/dtos/create-simulation.dto';
import { FinancingSimulatorRepository } from '@application/modules/financing-simulators/repositorties/financing-simulator.repository';

describe('Financing Simulation Integration Tests', () => {
    let app: INestApplication<App>;
    let studentRepository: StudentRepository;
    let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
    let token: string;
    let studentFactory: StudentFactory;
    let student: StudentEntity;
    let cryptoRepository: CryptoRepository;
    let financingSimulatorRepository: FinancingSimulatorRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        studentRepository = app.get<StudentRepository>('StudentRepository');
        cryptoRepository = app.get<CryptoRepository>('CryptoRepository');
        financingSimulatorRepository = app.get<FinancingSimulatorRepository>(
            'FinancingSimulatorRepository',
        );
        generateAccessTokenUseCase = app.get(GenerateAccessTokenUseCase);
        studentFactory = new StudentFactory(
            studentRepository,
            cryptoRepository,
        );

        student = await studentFactory.create({});
        token = await generateAccessTokenUseCase.execute({
            studentUuid: student.getUuid(),
        });
    });

    it('Should create a simulation and return right value for monthly interest', async () => {
        const body: CreateSimulationDto = {
            installments: 12,
            monthlyInterest: '0.015',
            total: '10000',
        };
        const result = '916.80';

        const response = await request(app.getHttpServer())
            .post('/simulations')
            .set('Authorization', `Bearer ${token}`)
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty('monthlyInstallment', result);

        const [simulation] = await financingSimulatorRepository.find({
            where: { studentId: student.getId() },
        });

        expect(simulation).toBeTruthy();
        expect(simulation.studentId).toBe(student.getId());
        expect(simulation.getMonthlyInstallment().toFixed(2)).toBe(result);
    });
});
