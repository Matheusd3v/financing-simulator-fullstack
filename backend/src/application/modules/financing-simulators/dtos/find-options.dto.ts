import Decimal from 'decimal.js';

interface FinancingSimulatorWhereOptions {
    id?: number;
    uuid?: string;
    createdAt?: Date;
    installments?: number;
    total?: Decimal;
    studentId?: number;
    deletedAt?: boolean;
}

export interface IFindOptionsFinancingSimulatorDto {
    where?: Partial<FinancingSimulatorWhereOptions>;
    page?: number;
    size?: number;
}
