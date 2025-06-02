import { Auth, type AuthProps } from "./auth.service";
import { Simulation, type SimulationProps } from "./simulation.service";
import { Student, type StudentProps } from "./student.service";

export const Services = {
    Auth,
    Student,
    Simulation
};

export type ServiceProps = {
    AuthProps: AuthProps;
    Student: StudentProps;
    Simulation: SimulationProps
}