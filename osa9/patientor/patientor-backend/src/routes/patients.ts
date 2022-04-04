import express from 'express';
const router = express.Router();

import patientsService from '../services/patientsService';
import toNewPatient, { toNewEntry } from '../utils';


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

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientsService.findById(req.params.id);

    const newEntry = toNewEntry(req.body);

    if (patient && newEntry) {
      const addedEntry = patientsService.addEntry(patient, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400);
  }
});


export default router;