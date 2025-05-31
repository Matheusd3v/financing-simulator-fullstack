import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtRequestPayloadDto } from './dtos/jwt-request-payload.dto';
import { StudentRepository } from '../students/repositories/student.repository';
import { TokenExpiredException } from '../../shared/exceptions/token-expired.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject('StudentRepository')
        private readonly studentRepository: StudentRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.JWT_SECRET ?? '',
        });
    }

    public async validate(payload: JwtRequestPayloadDto) {
        const { studentUuid } = this.validateJwt(payload);
        const student = await this.studentRepository.findOne({
            where: { uuid: studentUuid },
        });

        if (!student) {
            throw new TokenExpiredException('Token Expirado!')
        }

        return student;
    }

    private validateJwt(payload: JwtRequestPayloadDto) {
        if (new Date(payload.exp * 1000) < new Date()) {
            throw new TokenExpiredException('Token Expirado!')
        }

        return payload;
    }
}
