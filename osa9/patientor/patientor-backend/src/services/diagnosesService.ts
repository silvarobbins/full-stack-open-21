import diagnosesData from '../../data/diagnosesData.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose
};