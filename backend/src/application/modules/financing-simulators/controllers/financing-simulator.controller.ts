import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUserAuth } from '@root/src/application/shared/decorators/user-auth.decorator';
import { StudentEntity } from '../../students/entities/student.entity';
import { CreateSimulationDto } from '../dtos/create-simulation.dto';
import { SimulationResponseDto } from '../dtos/simulation-response.dto';
import { CreateSimulationUseCase } from '../usecases/create-simulation.usecase';

@ApiTags('Financing Simulator')
@Controller()
export class FinancingSimulatorController {
    constructor(
        private readonly createSimulationUseCase: CreateSimulationUseCase,
    ) {}

    @Post('/simulations')
    @UseGuards(AuthGuard('jwt'))
    async registerSimulation(
        @GetUserAuth() student: StudentEntity,
        @Body() body: CreateSimulationDto,
    ): Promise<SimulationResponseDto> {
        const response = await this.createSimulationUseCase.execute(
            student,
            body,
        );
        return response;
    }
}
