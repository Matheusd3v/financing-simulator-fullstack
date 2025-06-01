import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsDate,
    IsInt,
    IsNumberString,
    IsOptional,
    IsPositive,
    Min,
} from 'class-validator';

export class ListSimulationsPaginateDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    size: number = 10;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsNumberString()
    @IsOptional()
    total: string;

    @IsPositive()
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    installments: number;

    studentId: number;
}
