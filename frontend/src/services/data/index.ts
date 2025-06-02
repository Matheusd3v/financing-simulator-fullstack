import { Auth, type AuthProps } from "./auth.service";
import { Student, type StudentProps } from "./student.service";

export const Services = {
    Auth,
    Student
};

export type ServiceProps = {
    AuthProps: AuthProps;
    Student: StudentProps
}