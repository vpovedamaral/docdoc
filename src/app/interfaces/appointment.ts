import { Doctor } from "./doctor";

export interface Appointment {
    id: number;
    available: boolean;
    date: string;
    doctorId: number;
    patientId: number|null;
    time: string;
    doctor?: Doctor
}
