import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@root/generated/prisma/client';
import { FinancingSimulatorRepository } from '@application/modules/financing-simulators/repositorties/financing-simulator.repository';
import { IFindOptionsFinancingSimulatorDto } from '@application/modules/financing-simulators/dtos/find-options.dto';
import { FinancingSimulatorEntity } from '@application/modules/financing-simulators/entities/financing-simulator.entity';
import { FinancingSimulatorBuilder } from '../builders/financing-simulator.builder';
import { FinancingSimulatorMap } from '../mappers/financing-simulator.mapper';

@Injectable()
export class FinancingSimulatorPostgresqlRepository
    implements FinancingSimulatorRepository
{
    constructor(
        private readonly prismaService: TransactionHost<
            TransactionalAdapterPrisma<PrismaClient>
        >,
    ) {}

    public async save(
        entity: FinancingSimulatorEntity,
    ): Promise<FinancingSimulatorEntity> {
        const simulation =
            await this.prismaService.tx.financingSimulator.create({
                data: {
                    installments: entity.getInstallments(),
                    monthlyInstallment: entity.getMonthlyInstallment(),
                    monthlyInterest: entity.getMonthlyInterest(),
                    total: entity.getTotal(),
                    studentId: entity.studentId,
                },
            });

        return FinancingSimulatorMap.fromDB(simulation);
    }

    public async find(
        args: IFindOptionsFinancingSimulatorDto,
    ): Promise<FinancingSimulatorEntity[]> {
        const { page, size } = args;
        let paginationArgs = {};

        if (page && size) {
            paginationArgs = {
                skip: (page - 1) * size,
                take: size,
            };
        }

        const simulations =
            await this.prismaService.tx.financingSimulator.findMany({
                where: FinancingSimulatorBuilder.build(args)?.where,
                orderBy: {
                    createdAt: 'desc',
                },
                ...paginationArgs,
            });
        return simulations.map((simulation) =>
            FinancingSimulatorMap.fromDB(simulation),
        );
    }

    public async count(
        args: IFindOptionsFinancingSimulatorDto,
    ): Promise<number> {
        return this.prismaService.tx.financingSimulator.count({
            where: FinancingSimulatorBuilder.build(args)?.where,
        });
    }
}
