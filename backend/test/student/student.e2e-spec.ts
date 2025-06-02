import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { randomUUID } from 'node:crypto';
import { StudentRepository } from '@application/modules/students/repositories/student.repository';
import { AppModule } from '@application/app.module';
import { CreateStudentDto } from '@application/modules/students/dtos/create-student.dto';
import { fakerPT_BR } from '@faker-js/faker/.';
import { GenerateAccessTokenUseCase } from '@application/modules/auth/usecases/generate-acces-token.usecase';
import { StudentFactory } from '../factory/student.factory';
import { StudentEntity } from '@application/modules/students/entities/student.entity';
import { CryptoRepository } from '@infrastructure/crypto/crypto.repository';
import { UpdateStudentDto } from '@application/modules/students/dtos/update-student.dto';

describe('Student Integration Tests', () => {
    let app: INestApplication<App>;
    let studentRepository: StudentRepository;
    let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
    let token: string;
    let studentFactory: StudentFactory;
    let student: StudentEntity;
    let cryptoRepository: CryptoRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        studentRepository = app.get<StudentRepository>('StudentRepository');
        cryptoRepository = app.get<CryptoRepository>('CryptoRepository');
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

    it('Should register a new student with status 201 CREATED', async () => {
        const body: CreateStudentDto = {
            email: 'john.doe@mail.com',
            password: randomUUID(),
            lastName: fakerPT_BR.person.firstName(),
            name: fakerPT_BR.person.lastName(),
        };

        const response = await request(app.getHttpServer())
            .post('/register')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty('message', 'Estudante Criado!');

        const student = await studentRepository.findOne({
            where: { email: body.email },
        });

        expect(student).toBeTruthy();
        expect(student?.getEmail()).toBe(body.email);
        expect(student?.getPassword()).not.toBe(body.password);
    });

    it('Should throws CONFLICT ERROR when try register same email', async () => {
        const body: CreateStudentDto = {
            email: 'john.doe@mail.com',
            password: randomUUID(),
            lastName: fakerPT_BR.person.firstName(),
            name: fakerPT_BR.person.lastName(),
        };

        const response = await request(app.getHttpServer())
            .post('/register')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.CONFLICT);
        expect(response.body).toHaveProperty(
            'message',
            'Estudante ja cadastrado! Tente outro email',
        );
    });

    it('Should update a student with status 200 OK', async () => {
        const body: Omit<UpdateStudentDto, 'password'> = {
            email: student.getEmail(),
            lastName: fakerPT_BR.person.firstName(),
            name: fakerPT_BR.person.lastName(),
        };

        const response = await request(app.getHttpServer())
            .put('/me')
            .set('Authorization', `Bearer ${token}`)
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);

        const updated = await studentRepository.findOne({
            where: { email: body.email },
        });

        expect(updated).toBeTruthy();
        expect(updated?.getEmail()).toBe(body.email);
        expect(updated?.name).toBe(body.name);
        expect(updated?.lastName).toBe(body.lastName);
    });
});
