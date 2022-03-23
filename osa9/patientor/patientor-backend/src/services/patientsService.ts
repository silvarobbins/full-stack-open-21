import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patientsData';
import { NewPatient, Patient } from '../types';

const patients: Array<Patient> = patientsData

const getPatients = (): Array<Patient> => {
  return patients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};