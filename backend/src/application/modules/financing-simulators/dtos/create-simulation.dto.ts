import { ApiProperty } from '@nestjs/swagger';
import {
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateSimulationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    total: string;

    @ApiProperty()
    @IsDecimal()
    monthlyInterest: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    installments: number;
}
