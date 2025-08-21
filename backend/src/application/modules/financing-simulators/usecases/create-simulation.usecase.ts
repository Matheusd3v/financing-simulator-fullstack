import { Inject, Injectable } from '@nestjs/common';
import { StudentEntity } from '../../students/entities/student.entity';
import { CreateSimulationDto } from '../dtos/create-simulation.dto';
import { FinancingSimulatorRepository } from '../repositorties/financing-simulator.repository';
import { FinancingSimulatorEntity } from '../entities/financing-simulator.entity';

@Injectable()
export class CreateSimulationUseCase {
    constructor(
        @Inject('FinancingSimulatorRepository')
        private readonly financingSimulatorRepository: FinancingSimulatorRepository,
    ) {}

    public async execute(student: StudentEntity, body: CreateSimulationDto) {
        const simulation = new FinancingSimulatorEntity();

        simulation.setTotal(+body.total);
        simulation.setInstallments(body.installments);
        simulation.setMonthlyInterest(+body.monthlyInterest);
        simulation.calculateMonthlyInstallment();
        simulation.studentId = student.getId();

        const simulationSaved =
            await this.financingSimulatorRepository.save(simulation);

        return {
            monthlyInstallment: simulation.getMonthlyInstallment().toFixed(2),
            uuid: simulationSaved.getUuid(),
        };
    }
}
