import { CommonEntity } from "@application/shared/classes/common-entity";

export class StudentEntity extends CommonEntity {
    name: string;
    lastName: string;
    isActive: boolean;
    private email: string;
    private password: string;

    public setEmail(email: string): void {
        this.email = email.trim().toLowerCase()
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getPassword(): string {
        return this.password 
    }

    public getEmail(): string {
        return this.email
    }
}