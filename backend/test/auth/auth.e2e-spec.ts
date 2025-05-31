import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker/.';
import { StudentRepository } from '@root/src/application/modules/students/repositories/student.repository';
import { StudentEntity } from '@root/src/application/modules/students/entities/student.entity';
import { CryptoRepository } from '@root/src/infrastructure/crypto/crypto.repository';
import { AppModule } from '@root/src/application/app.module';
import { StudentFactory } from '../factory/student.factory';

describe('Auth Integration Tests', () => {
    let app: INestApplication<App>;
    let studentRepository: StudentRepository;
    let cryptoRepository: CryptoRepository;
    let student: StudentEntity;
    const password = randomUUID();

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        studentRepository = app.get<StudentRepository>('StudentRepository');
        cryptoRepository = app.get<CryptoRepository>('CryptoRepository');

        student = await new StudentFactory(
            studentRepository,
            cryptoRepository,
        ).create({
            password,
        });
    });

    it('Should login student with success', async () => {
        const body = {
            email: student.getEmail(),
            password,
        };

        const response = await request(app.getHttpServer())
            .post('/login')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('uuid', student.getUuid());
    });

    it('Should throw error when try login with invalid credentials', async () => {
        const body = {
            email: student.getEmail(),
            password: faker.animal.horse(),
        };

        const response = await request(app.getHttpServer())
            .post('/login')
            .send(body);

        expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
});
