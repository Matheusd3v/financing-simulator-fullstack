interface FinancingSimulatorWhereOptions {
    id?: number;
    uuid?: string;
    createdAt?: Date;
    installments?: number;
    total?: number;
    studentId?: number;
    deletedAt?: boolean;
}

export interface IFindOptionsFinancingSimulatorDto {
    where?: Partial<FinancingSimulatorWhereOptions>;
    page?: number;
    size?: number;
}
