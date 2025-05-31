import { CommonEntity } from '@application/shared/classes/common-entity';
import Decimal from 'decimal.js';

export class FinancingSimulatorEntity extends CommonEntity {
    private total: Decimal;
    private installments: number;
    private monthlyInterest: Decimal;
    private monthlyInstallment: Decimal;
    studentId: number;

    public setTotal(total: Decimal): void {
        this.total = total;
    }

    public setInstallments(value: number): void {
        this.installments = value;
    }

    public setMonthlyInterest(value: Decimal): void {
        this.monthlyInterest = value;
    }

    public setMonthlyInstallment(value: Decimal): void {
        this.monthlyInstallment = value;
    }

    public getTotal(): Decimal {
        return this.total;
    }

    public getInstallments(): number {
        return this.installments;
    }

    public getMonthlyInterest(): Decimal {
        return this.monthlyInterest;
    }

    public getMonthlyInstallment(): Decimal {
        return this.monthlyInstallment;
    }

    public calculateMonthlyInstallment(): void {
        const isZeroInterest = this.monthlyInterest.equals(0);
        if (isZeroInterest) {
            this.monthlyInstallment = this.total.div(this.installments);
            return;
        }

        const discountFactor = new Decimal(1).minus(
            this.monthlyInterest.plus(1).pow(-this.installments),
        );
        const monthlyInstallment = this.total
            .mul(this.monthlyInterest)
            .div(discountFactor);

        this.monthlyInstallment = monthlyInstallment;
    }
}
