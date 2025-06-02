interface StudentWhereOptions {
    id?: number;
    name?: string;
    email?: string;
    uuid?: string;
}

export interface IFindOptionsStudentDto {
    where?: Partial<StudentWhereOptions>;
}
