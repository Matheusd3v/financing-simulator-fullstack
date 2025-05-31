import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { StudentEntity } from '../../modules/students/entities/student.entity';

export const GetUserAuth = createParamDecorator(
    (_, ctx: ExecutionContext): StudentEntity => {
        const req = ctx
            .switchToHttp()
            .getRequest<Request & { student: StudentEntity }>();
        return req.student;
    },
);
