import { IFindOptionsFinancingSimulatorDto } from '@application/modules/financing-simulators/dtos/find-options.dto';
import { Prisma } from '@root/generated/prisma/client';

export class FinancingSimulatorBuilder {
    static build(dto?: IFindOptionsFinancingSimulatorDto) {
        const where: Prisma.FinancingSimulatorWhereInput = {};

        if (!dto?.where) return { where };

        if (dto?.where.installments) {
            where.installments = dto.where.installments;
        }

        if (dto?.where?.total) {
            where.total = dto.where.total;
        }

        if (dto?.where?.studentId) {
            where.studentId = dto.where.studentId;
        }

        if (dto?.where?.createdAt) {
            const startOfDay = new Date(dto.where.createdAt);
            startOfDay.setUTCHours(0, 0, 0, 0);

            const endOfDay = new Date(dto.where.createdAt);
            endOfDay.setUTCHours(23, 59, 59, 999);
            where.createdAt = {
                gte: startOfDay,
                lte: endOfDay,
            };
        }

        return { where };
    }
}
