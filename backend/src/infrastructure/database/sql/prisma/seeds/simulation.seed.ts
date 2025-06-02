import { getRandomFloat } from '@shared/util/random-float.util';
import { prismaSeed } from '.';
import { randomInt } from 'node:crypto';
import Decimal from 'decimal.js';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const simulationSeed = async () => {
    const students = await prismaSeed.student.findMany({
        select: {
            id: true,
            _count: {
                select: {
                    simulators: true,
                },
            },
        },
    });

    const simulations = students
        .filter(({ _count }) => _count?.simulators < 1)
        .map(({ id }) => {
            return Array.from({ length: 150 }, () => {
                return {
                    total: new Decimal(getRandomFloat(5250.3, 850666.5)),
                    installments: randomInt(12, 60),
                    monthlyInstallment: new Decimal(
                        getRandomFloat(1500.5, 15900.5),
                    ),
                    monthlyInterest: new Decimal(getRandomFloat(0.01, 0.12)),
                    studentId: id,
                    createdAt: faker.date.between({
                        from: '2024-05-01T00:00:00.000Z',
                        to: '2025-06-01T00:00:00.000Z',
                    }),
                };
            });
        });

    await prismaSeed.financingSimulator.createMany({
        data: simulations.flat(),
    });
};
