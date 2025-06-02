import { Inject, Injectable } from '@nestjs/common';
import { FinancingSimulatorRepository } from '../repositorties/financing-simulator.repository';
import { ListSimulationsPaginateDto } from '../dtos/list-simulations-request.dto';
import Decimal from 'decimal.js';

@Injectable()
export class RetrieveStudentSimulationsUseCase {
    constructor(
        @Inject('FinancingSimulatorRepository')
        private readonly financingSimulatorRepository: FinancingSimulatorRepository,
    ) {}

    public async execute(simulationParams: ListSimulationsPaginateDto) {
        const { page, size } = simulationParams;
        const where = {
            studentId: simulationParams.studentId,
            createdAt: simulationParams?.createdAt,
            installments: simulationParams?.installments,
            total: simulationParams?.total
                ? new Decimal(simulationParams.total)
                : undefined,
        };
        const [total, simulations] = await Promise.all([
            this.financingSimulatorRepository.count({
                where,
            }),
            this.financingSimulatorRepository.find({
                page: simulationParams.page,
                size: simulationParams.size,
                where,
            }),
        ]);

        return {
            page,
            size,
            total,
            lastPage: Math.ceil(total / size),
            data: simulations.map((simulation) => {
                return {
                    uuid: simulation.getUuid(),
                    total: simulation.getTotal().toFixed(2),
                    installments: simulation.getInstallments(),
                    monthlyInterest: simulation.getMonthlyInterest().toString(),
                    monthlyInstallment: simulation
                        .getMonthlyInstallment()
                        .toFixed(2),
                    createdAt: simulation.getCreatedAt(),
                };
            }),
        };
    }
}
