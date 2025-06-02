import { ApiProperty } from '@nestjs/swagger';

class User {
    @ApiProperty()
    uuid: string;

    @ApiProperty()
    name: string;
}

export class LoginResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty({ type: () => User })
    user: User;
}
