import { ApiProperty } from '@nestjs/swagger';

class Simulation {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    total: string;

    @ApiProperty()
    installments: number;

    @ApiProperty()
    monthlyInterest: string;

    @ApiProperty()
    monthlyInstallment: string;

    @ApiProperty()
    createdAt: Date;
}

export class SimulationPaginatedDto {
    @ApiProperty()
    page: number;

    @ApiProperty()
    size: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    lastPage: number;

    @ApiProperty({ type: [Simulation] })
    data: Simulation[];
}
