import patientsData from '../../data/patientsData.json';

import { Patient } from '../types';

const patients: Array<Patient> = patientsData

const getPatients = (): Array<Patient> => {
  return patients;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient
};