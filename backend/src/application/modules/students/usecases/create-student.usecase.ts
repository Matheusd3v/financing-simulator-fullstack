import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { CryptoRepository } from "@infrastructure/crypto/crypto.repository";
import { StudentEntity } from "../entities/student.entity";

@Injectable()
export class CreateStudentUseCase {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
        @Inject('CryptoRepository')
        private readonly cryptoRepository: CryptoRepository
    ) {}

    public async execute(body: CreateStudentDto) {
        await this.validateEmail(body.email)
        
        const passwordHashed = await this.cryptoRepository.hash(body.password)

        const student = new StudentEntity()
        student.setEmail(body.email)
        student.setPassword(passwordHashed)
        student.lastName = body.lastName
        student.name = body.name

        await this.studentRepository.save(student)
    }

    private async validateEmail(email: string) {
        const student = await this.studentRepository.findOne({
            where: {
                email
            }
        })

        if (student) {
            throw new ConflictException({
                message: 'Estudante ja cadastrado! Tente outro email'
            })
        }
    }
}