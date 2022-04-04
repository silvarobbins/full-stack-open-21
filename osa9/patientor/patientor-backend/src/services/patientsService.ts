import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patientsData';
import { NewEntry, NewPatient, Patient } from '../types';

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

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return patient;
};

const findById = (id: string): Patient | undefined=> {
  const patient = patients.find(d => d.id === id);
  return patient;
};

export default {
  getPatients,
  addPatient,
  addEntry,
  findById
};