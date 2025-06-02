import { PrismaClient } from '@root/generated/prisma/client';
import { studentSeed } from './student.seed';
import { simulationSeed } from './simulation.seed';

export const prismaSeed = new PrismaClient();

async function main() {
    console.log(`Executando seeds no ambiente ${process.env.NODE_ENV} 🌱`);
    await studentSeed();
    await simulationSeed();
}

main()
    .then(async () => {
        await prismaSeed.$disconnect();
    })
    .catch(async (e: unknown) => {
        console.error(`Erro ao executar seeds: `, { e });
        await prismaSeed.$disconnect();
        process.exit(1);
    });
