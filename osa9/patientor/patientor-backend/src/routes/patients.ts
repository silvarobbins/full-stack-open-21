import express from 'express';
const router = express.Router();

import patientsService from '../services/patientsService';
import toNewPatient from '../utils';


router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const entry = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(entry);
    res.json(newPatient);
  } catch (e) {
    res.status(400)
  }
  
});

export default router;