import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseTextField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing field');
  }

  return field;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseTextField(name),
    dateOfBirth: parseTextField(dateOfBirth),
    ssn: parseTextField(ssn),
    gender: parseGender(gender),
    occupation: parseTextField(occupation)
  };

  return newEntry;
};

export default toNewPatient;