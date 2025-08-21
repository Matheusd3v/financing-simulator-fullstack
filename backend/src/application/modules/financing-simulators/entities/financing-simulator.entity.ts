import { CommonEntity } from '@application/shared/classes/common-entity';

export class FinancingSimulatorEntity extends CommonEntity {
    private total: number;
    private installments: number;
    private monthlyInterest: number;
    private monthlyInstallment: number;
    studentId: number;

    public setTotal(total: number): void {
        this.total = total;
    }

    public setInstallments(value: number): void {
        this.installments = value;
    }

    public setMonthlyInterest(value: number): void {
        this.monthlyInterest = value;
    }

    public setMonthlyInstallment(value: number): void {
        this.monthlyInstallment = value;
    }

    public getTotal(): number {
        return this.total;
    }

    public getInstallments(): number {
        return this.installments;
    }

    public getMonthlyInterest(): number {
        return this.monthlyInterest;
    }

    public getMonthlyInstallment(): number {
        return this.monthlyInstallment;
    }

    public calculateMonthlyInstallment(): void {
        if (!this.total || !this.installments) {
            throw new Error(
                'Total and installments must be set before calculation.',
            );
        }

        // Se a taxa de juros é zero, parcela é só total / n
        if (!this.monthlyInterest || this.monthlyInterest === 0) {
            this.monthlyInstallment = this.total / this.installments;
            return;
        }

        const i = this.monthlyInterest;
        const n = this.installments;
        const pv = this.total;

        // Fórmula Price: PMT = PV * (i / (1 - (1 + i)^-n))
        const discountFactor = 1 - Math.pow(1 + i, -n);
        const monthlyInstallment = pv * (i / discountFactor);

        this.monthlyInstallment = monthlyInstallment;
    }
}
