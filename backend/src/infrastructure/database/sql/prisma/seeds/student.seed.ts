import { StudentEntity } from '@root/src/application/modules/students/entities/student.entity';
import { prismaSeed } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const studentSeed = async () => {
    const count = await prismaSeed.student.count({
        where: {
            simulators: {
                none: {},
            },
        },
    });
    if (count < 1) return;
    const students = Array.from({ length: 10 }, () => {
        const student = new StudentEntity();
        student.setEmail(faker.internet.email());
        student.setPassword(
            '$2b$10$3Py.06IV7NFormYFBUXjNOoax6EP/wlUilC3kclBsgHTKIfFPyMxu',
        );
        student.name = faker.person.fullName();
        student.lastName = faker.person.lastName();
        return student;
    });

    await prismaSeed.student.createMany({
        data: students.map((student) => {
            return {
                email: student.getEmail(),
                lastName: student.lastName,
                name: student.name,
                password: student.getPassword(),
            };
        }),
        skipDuplicates: true,
    });
};
