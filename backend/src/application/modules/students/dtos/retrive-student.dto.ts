import { ApiProperty } from '@nestjs/swagger';

export class RetriveStudentDto {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    isActive: boolean;
}
