import { FinancingSimulatorEntity } from '@application/modules/financing-simulators/entities/financing-simulator.entity';
import Decimal from 'decimal.js';

describe('FinancingSimulatorEntity Unit tests', () => {
    it('should calculate monthly installment with interest', () => {
        const entity = new FinancingSimulatorEntity();
        entity.setTotal(new Decimal('10000'));
        entity.setInstallments(12);
        entity.setMonthlyInterest(new Decimal('0.015'));

        entity.calculateMonthlyInstallment();

        const result = entity.getMonthlyInstallment();
        expect(result.toFixed(2)).toBe('916.80');
    });

    it('should calculate monthly installment with zero interest', () => {
        const entity = new FinancingSimulatorEntity();
        entity.setTotal(new Decimal('12000'));
        entity.setInstallments(12);
        entity.setMonthlyInterest(new Decimal('0'));

        entity.calculateMonthlyInstallment();

        const result = entity.getMonthlyInstallment();
        expect(result.toFixed(2)).toBe('1000.00');
    });

    it('should handle one installment correctly', () => {
        const entity = new FinancingSimulatorEntity();
        entity.setTotal(new Decimal('5000'));
        entity.setInstallments(1);
        entity.setMonthlyInterest(new Decimal('0.03'));

        entity.calculateMonthlyInstallment();

        const result = entity.getMonthlyInstallment();
        expect(result.toFixed(2)).toBe('5150.00');
    });

    it('should handle large interest rates', () => {
        const entity = new FinancingSimulatorEntity();
        entity.setTotal(new Decimal('2000'));
        entity.setInstallments(6);
        entity.setMonthlyInterest(new Decimal('0.10'));

        entity.calculateMonthlyInstallment();

        const result = entity.getMonthlyInstallment();
        expect(result.toFixed(2)).toBe('459.21');
    });

    it('should set and get fields correctly', () => {
        const entity = new FinancingSimulatorEntity();
        const total = new Decimal('8000');
        const monthly = new Decimal('700');

        entity.setTotal(total);
        entity.setInstallments(10);
        entity.setMonthlyInterest(new Decimal('0.01'));
        entity.setMonthlyInstallment(monthly);

        expect(entity.getTotal().equals(total)).toBe(true);
        expect(entity.getInstallments()).toBe(10);
        expect(entity.getMonthlyInterest().toFixed(2)).toBe('0.01');
        expect(entity.getMonthlyInstallment().equals(monthly)).toBe(true);
    });
});
