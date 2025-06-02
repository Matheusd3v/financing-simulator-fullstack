import { Prisma } from '@root/generated/prisma/client';
import { IFindOptionsStudentDto } from '@application/modules/students/dtos/find-options.dto';

export class StudentBuilder {
    static build(dto?: IFindOptionsStudentDto) {
        const where: Prisma.StudentWhereInput = {};

        if (!dto?.where) return { where };

        Object.entries(dto.where).forEach(([key, value]) => {
            if (value === undefined) return;
            where[key] = value;
        });

        return { where };
    }
}
