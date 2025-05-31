import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../usecases/login.usecase';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenerateAccessTokenUseCase } from '../usecases/generate-acces-token.usecase';

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly generateAccessToken: GenerateAccessTokenUseCase,
    ) {}

    @Post('/login')
    @ApiResponse({
        type: LoginResponseDto,
        status: HttpStatus.OK,
    })
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
        const { student } = await this.loginUseCase.execute(body);
        const token = await this.generateAccessToken.execute({
            studentUuid: student.getUuid(),
        });

        return { token, uuid: student.getUuid() };
    }
}
