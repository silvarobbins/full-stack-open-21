import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import WorkIcon from '@mui/icons-material/Work';

import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setDiagnosesList } from "../state/reducer";
import { Diagnosis } from "../types";

interface entryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryComponent: React.FC<entryProps> = ({ entry }) => {
  const [{diagnoses}, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesData));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div style={{ padding: "16px", backgroundColor: '#eee', borderRadius: "15px", marginBottom: "16px"}}>
      <Typography align="left" variant="h6">
        <br/>
        {entry.date} <WorkIcon/> {entry.employerName}<br/>
        <i>{entry.description}</i> <br/>
        Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        <ul>
          {entry?.diagnosisCodes?.map((code: string) => (
            <li key = {code}>
              {code} {diagnoses[code]?.name}
            </li>
          ))}
        </ul>
        Doctor: {entry.specialist} <br/>
      </Typography>
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;