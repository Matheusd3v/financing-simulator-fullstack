import Decimal from 'decimal.js';

interface FinancingSimulatorWhereOptions {
    id?: number;
    createdAt?: Date;
    installments?: number;
    total?: Decimal;
    studentId?: number;
}

export interface IFindOptionsFinancingSimulatorDto {
    where?: Partial<FinancingSimulatorWhereOptions>;
    page?: number;
    size?: number;
}
