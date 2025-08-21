import { FinancingSimulator } from '@root/generated/prisma/client';
import { FinancingSimulatorEntity } from '@application/modules/financing-simulators/entities/financing-simulator.entity';

export class FinancingSimulatorMap {
    static fromDB(dbSimulation: FinancingSimulator): FinancingSimulatorEntity {
        const simulation = new FinancingSimulatorEntity();

        simulation.setId(dbSimulation.id);
        simulation.setUuid(dbSimulation.uuid);
        simulation.setCreatedAt(dbSimulation.createdAt);
        simulation.setInstallments(dbSimulation.installments);
        simulation.setMonthlyInstallment(
            Number(dbSimulation.monthlyInstallment),
        );
        simulation.setMonthlyInterest(Number(dbSimulation.monthlyInterest));
        simulation.setTotal(Number(dbSimulation.total));
        simulation.studentId = dbSimulation.studentId;

        return simulation;
    }
}
