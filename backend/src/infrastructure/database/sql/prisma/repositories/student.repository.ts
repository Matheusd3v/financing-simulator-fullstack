import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@root/generated/prisma/client';
import { IFindOptionsStudentDto } from '@application/modules/students/dtos/find-options.dto';
import { StudentEntity } from '@application/modules/students/entities/student.entity';
import { StudentRepository } from '@application/modules/students/repositories/student.repository';
import { StudentMap } from '../mappers/student.mapper';
import { StudentBuilder } from '../builders/student.builder';

@Injectable()
export class StudentPostgresqlRepository implements StudentRepository {
    constructor(
        private readonly prismaService: TransactionHost<
            TransactionalAdapterPrisma<PrismaClient>
        >,
    ) {}

    public async update(entity: StudentEntity): Promise<void> {
        await this.prismaService.tx.student.update({
            data: {
                name: entity.name,
                lastName: entity.lastName,
                email: entity.getEmail(),
                password: entity.getPassword(),
            },
            where: { id: entity.getId() },
        });
    }

    public async save(entity: StudentEntity): Promise<StudentEntity> {
        const saved = await this.prismaService.tx.student.create({
            data: {
                password: entity.getPassword(),
                email: entity.getEmail(),
                lastName: entity.lastName,
                name: entity.name,
            },
        });
        return StudentMap.fromDB(saved);
    }

    public async findOne(
        args: IFindOptionsStudentDto,
    ): Promise<StudentEntity | null> {
        const student = await this.prismaService.tx.student.findFirst({
            where: StudentBuilder.build(args)?.where,
        });
        if (!student) return null;
        return StudentMap.fromDB(student);
    }
}
