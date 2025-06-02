import { StudentEntity } from '@application/modules/students/entities/student.entity';
import { Student } from '@root/generated/prisma/client';

export class StudentMap {
    static fromDB(data: Student): StudentEntity {
        const student = new StudentEntity();

        student.setId(data.id);
        student.setUuid(data.uuid);
        student.setCreatedAt(data.createdAt);
        student.setPassword(data.password);
        student.setEmail(data.email);
        student.name = data.name;
        student.lastName = data.lastName;
        student.isActive = data.isActive;

        return student;
    }
}
