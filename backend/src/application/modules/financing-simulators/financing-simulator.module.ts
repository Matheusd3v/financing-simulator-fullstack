import { Module } from '@nestjs/common';
import { FinancingSimulatorPostgresqlRepository } from '@infrastructure/database/sql/prisma/repositories/financing-simulator.repository';
import { CreateSimulationUseCase } from './usecases/create-simulation.usecase';
import { FinancingSimulatorController } from './controllers/financing-simulator.controller';

@Module({
    controllers: [FinancingSimulatorController],
    providers: [
        {
            provide: 'FinancingSimulatorRepository',
            useClass: FinancingSimulatorPostgresqlRepository,
        },
        CreateSimulationUseCase,
    ],
})
export class FinancingSimulatorModule {}
