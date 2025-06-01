import { Inject, Injectable } from '@nestjs/common';
import { FinancingSimulatorRepository } from '../repositorties/financing-simulator.repository';

@Injectable()
export class DeleteSimulationUseCase {
    constructor(
        @Inject('FinancingSimulatorRepository')
        private readonly financingSimulatorRepository: FinancingSimulatorRepository,
    ) {}

    public async execute(data: { uuid: string; studentId: number }) {
        const simulation = await this.financingSimulatorRepository.findOne({
            where: { uuid: data.uuid, studentId: data.studentId },
        });
        if (!simulation) return;
        await this.financingSimulatorRepository.delete(simulation.getId());
    }
}
