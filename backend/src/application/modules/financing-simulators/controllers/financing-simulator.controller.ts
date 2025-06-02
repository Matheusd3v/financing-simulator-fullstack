import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserAuth } from '@root/src/application/shared/decorators/user-auth.decorator';
import { StudentEntity } from '../../students/entities/student.entity';
import { CreateSimulationDto } from '../dtos/create-simulation.dto';
import { SimulationResponseDto } from '../dtos/simulation-response.dto';
import { CreateSimulationUseCase } from '../usecases/create-simulation.usecase';
import { ListSimulationsPaginateDto } from '../dtos/list-simulations-request.dto';
import { RetrieveStudentSimulationsUseCase } from '../usecases/retrieve-student-simulations.usecase';
import { SimulationPaginatedDto } from '../dtos/simulations-paginated.dto';
import { DeleteSimulationUseCase } from '../usecases/delete-simulation.usecase';
import { UpdateSimulationDto } from '../dtos/update-simulation.dto';
import { UpdateSimulationUseCase } from '../usecases/update-simulation.usecase';

@ApiTags('Financing Simulator')
@Controller()
export class FinancingSimulatorController {
    constructor(
        private readonly createSimulationUseCase: CreateSimulationUseCase,
        private readonly retrieveStudentSimulationsUseCase: RetrieveStudentSimulationsUseCase,
        private readonly deleteSimulationUseCase: DeleteSimulationUseCase,
        private readonly updateSimulationUseCase: UpdateSimulationUseCase,
    ) {}

    @Post('/simulations')
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({
        type: SimulationResponseDto,
        status: HttpStatus.CREATED,
    })
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

    @Get('/simulations')
    @UseGuards(AuthGuard('jwt'))
    async retrieveSimulations(
        @GetUserAuth() student: StudentEntity,
        @Query() queryParams: ListSimulationsPaginateDto,
    ): Promise<SimulationPaginatedDto> {
        const responde = await this.retrieveStudentSimulationsUseCase.execute({
            ...queryParams,
            studentId: student.getId(),
        });
        return responde;
    }

    @Delete('/simulations/:uuid')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
    })
    async deleteSimulation(
        @GetUserAuth() student: StudentEntity,
        @Param('uuid', new ParseUUIDPipe({ version: '4' }))
        uuid: string,
    ) {
        await this.deleteSimulationUseCase.execute({
            studentId: student.getId(),
            uuid,
        });
    }

    @Patch('/simulations/:uuid')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async updateSimulation(
        @Body() body: UpdateSimulationDto,
        @GetUserAuth() student: StudentEntity,
        @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    ) {
        const response = await this.updateSimulationUseCase.execute({
            ...body,
            studentId: student.getId(),
            uuid,
        });
        return response;
    }
}
