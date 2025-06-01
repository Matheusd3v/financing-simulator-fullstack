import { Module } from '@nestjs/common';
import { FinancingSimulatorPostgresqlRepository } from '@infrastructure/database/sql/prisma/repositories/financing-simulator.repository';
import { CreateSimulationUseCase } from './usecases/create-simulation.usecase';
import { FinancingSimulatorController } from './controllers/financing-simulator.controller';
import { RetrieveStudentSimulationsUseCase } from './usecases/retrieve-student-simulations.usecase';
import { DeleteSimulationUseCase } from './usecases/delete-simulation.usecase';
import { UpdateSimulationUseCase } from './usecases/update-simulation.usecase';

@Module({
    controllers: [FinancingSimulatorController],
    providers: [
        {
            provide: 'FinancingSimulatorRepository',
            useClass: FinancingSimulatorPostgresqlRepository,
        },
        CreateSimulationUseCase,
        RetrieveStudentSimulationsUseCase,
        DeleteSimulationUseCase,
        UpdateSimulationUseCase,
    ],
})
export class FinancingSimulatorModule {}
