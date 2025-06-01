import { IFindOptionsFinancingSimulatorDto } from '../dtos/find-options.dto';
import { FinancingSimulatorEntity } from '../entities/financing-simulator.entity';

export interface FinancingSimulatorRepository {
    save(entity: FinancingSimulatorEntity): Promise<FinancingSimulatorEntity>;
    find(
        args: IFindOptionsFinancingSimulatorDto,
    ): Promise<FinancingSimulatorEntity[]>;
    count(args: IFindOptionsFinancingSimulatorDto): Promise<number>;
    findOne(
        args: IFindOptionsFinancingSimulatorDto,
    ): Promise<FinancingSimulatorEntity | null>;
    update(entity: FinancingSimulatorEntity): Promise<void>;
    delete(id: number): Promise<void>;
}
