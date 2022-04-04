import React from "react";
import axios from "axios";
import { Typography, Button } from "@material-ui/core";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useParams } from "react-router-dom";

import { useStateValue } from "../state";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientDetails } from "../state/reducer";
import EntryComponent from "./Entries";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
import { addEntry } from "../state/reducer";
import { isHealthCheckEntry, isHospitalEntry, isOccupationalHealthcareEntry } from "../utils";



const PatientPage: React.FC = () => {
  const [{patient}, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();


  const { id } = useParams<{ id: string}>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patientDetails));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [patient, id, dispatch]);

  const genderIcon = () => {
    switch (patient?.gender) {
      case "male":
        return <MaleIcon/> ;
      case "female":
        return <FemaleIcon/> ;
      default:
        return null;
    }
  };

  const getEntryType = (values: EntryFormValues) => {
    let type;
    if (isHealthCheckEntry(values)) {
      type = "HealthCheck";
    } else if (isOccupationalHealthcareEntry(values)) {
      type = "OccupationalHealthcare";
    } else if (isHospitalEntry(values)) {
      type = "Hospital";
    }

    return type;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    let entry;
    const type = getEntryType(values);
    if (isOccupationalHealthcareEntry(values)) {
      if (
        values.sickLeave &&
        values.sickLeave.startDate !== "" &&
        values.sickLeave.endDate !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, sickLeave: undefined };
      }
    } else if (isHospitalEntry(values)) {
      if (
        values.discharge &&
        values.discharge.date !== "" &&
        values.discharge.criteria !== ""
      ) {
        entry = { ...values, type };
      } else {
        entry = { ...values, type, discharge: undefined };
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  return (
    <div className="App"> <br/>
      <Typography align="left" variant="h4">
        {patient?.name} {genderIcon()}
      </Typography>
      <Typography align="left" variant="h6">
        ssh: {patient?.ssn} <br/>
        occupation: {patient?.occupation}<br/><br/>
      </Typography>
      <Typography align="left" variant="h5">
        Entries
      </Typography>
      {patient?.entries?.map((entry: Entry) => (
        <EntryComponent key={entry.id} entry={entry}/>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;