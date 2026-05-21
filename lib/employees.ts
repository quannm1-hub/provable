import { EMPLOYEES_DATA } from "./datasets";
import type { Employee } from "./types";

export const INITIAL_EMPLOYEES: Employee[] = EMPLOYEES_DATA.map(
    ({ id, name, department, role, salary, status, location }) => ({
        id,
        name,
        department,
        role,
        salary,
        status,
        location,
    }),
);

export function cloneEmployees(): Employee[] {
    return INITIAL_EMPLOYEES.map((e) => ({ ...e }));
}
