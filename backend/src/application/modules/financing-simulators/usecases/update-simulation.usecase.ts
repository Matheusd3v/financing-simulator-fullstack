import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FinancingSimulatorRepository } from '../repositorties/financing-simulator.repository';
import { UpdateSimulationDto } from '../dtos/update-simulation.dto';

@Injectable()
export class UpdateSimulationUseCase {
    constructor(
        @Inject('FinancingSimulatorRepository')
        private readonly financingSimulatorRepository: FinancingSimulatorRepository,
    ) {}

    public async execute(body: UpdateSimulationDto) {
        const simulation = await this.financingSimulatorRepository.findOne({
            where: { uuid: body.uuid, studentId: body.studentId },
        });

        if (!simulation) {
            throw new NotFoundException({
                message: 'Simulação não encontrada!',
            });
        }

        if (body?.total) {
            simulation.setTotal(+body.total);
        }

        if (body?.installments) {
            simulation.setInstallments(body.installments);
        }

        if (body?.monthlyInterest) {
            simulation.setMonthlyInterest(+body.monthlyInterest);
        }

        simulation.calculateMonthlyInstallment();
        await this.financingSimulatorRepository.update(simulation);

        return {
            monthlyInstallment: simulation.getMonthlyInstallment(),
        };
    }
}
