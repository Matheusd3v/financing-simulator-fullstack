import { ApiProperty } from '@nestjs/swagger';

export class SimulationResponseDto {
    @ApiProperty()
    monthlyInstallment: string;

    @ApiProperty()
    uuid: string;
}
