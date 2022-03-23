export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
};
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export type NewPatient = Omit<Patient, 'id'>;
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};