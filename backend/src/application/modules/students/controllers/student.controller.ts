import { Transactional } from '@nestjs-cls/transactional';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateStudentUseCase } from '../usecases/create-student.usecase';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessMessage } from '@root/src/application/shared/classes/success-message';
import { AuthGuard } from '@nestjs/passport';
import { GetUserAuth } from '@shared/decorators/user-auth.decorator';
import { StudentEntity } from '../entities/student.entity';
import { RetriveStudentDto } from '../dtos/retrive-student.dto';

@ApiTags('Student')
@Controller()
export class StudentController {
    constructor(private readonly createStudentUseCase: CreateStudentUseCase) {}

    @Post('/register')
    @Transactional()
    @ApiResponse({
        type: SuccessMessage,
        status: HttpStatus.CREATED,
    })
    async register(@Body() body: CreateStudentDto) {
        await this.createStudentUseCase.execute(body);
        return {
            message: 'Estudante Criado!',
        };
    }

    @Post('/me')
    @ApiResponse({
        type: RetriveStudentDto,
        status: HttpStatus.OK,
    })
    @UseGuards(AuthGuard('jwt'))
    retriveStudent(@GetUserAuth() student: StudentEntity): RetriveStudentDto {
        return {
            uuid: student.getUuid(),
            name: student.name,
            lastName: student.lastName,
            email: student.getEmail(),
            isActive: student.isActive,
            createdAt: student.getCreatedAt(),
        };
    }
}
