export interface ISimulation {
    uuid: string;
    total: string;
    installments: number;
    monthlyInterest: string;
    monthlyInstallment: string;
    createdAt: string;
}

export interface ISimulationPaginated {
    data: ISimulation[];
    lastPage: number;
    page: number;
    size: number;
    total: number;
}
