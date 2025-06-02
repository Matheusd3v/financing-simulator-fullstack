import { IFindOptionsStudentDto } from '../dtos/find-options.dto';
import { StudentEntity } from '../entities/student.entity';

export interface StudentRepository {
    save(entity: StudentEntity): Promise<StudentEntity>;
    findOne(args: IFindOptionsStudentDto): Promise<StudentEntity | null>;
    update(entity: StudentEntity): Promise<void>;
}
