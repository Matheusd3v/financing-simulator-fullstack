import { Transactional } from "@nestjs-cls/transactional";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CreateStudentUseCase } from "../usecases/create-student.usecase";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { ApiResponse } from "@nestjs/swagger";
import { SuccessMessage } from "@root/src/application/shared/classes/success-message";

@Controller()
export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase
    ) {}

    @Post('/register')
    @Transactional()
    @ApiResponse({
        type: SuccessMessage,
        status: HttpStatus.CREATED
    })
    async register(
        @Body() body: CreateStudentDto
    ) {
        await this.createStudentUseCase.execute(body)
        return {
            message: 'Estudante Criado!'
        }
    }
}