import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setDiagnosesList } from "../state/reducer";
import { Diagnosis } from "../types";

interface entryProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryComponent: React.FC<entryProps> = ({ entry }) => {
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

  const getIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <SentimentVerySatisfiedIcon/>;
      case 1: 
        return <SentimentSatisfiedAltIcon/>;
      case 2: 
        return <SentimentNeutralIcon/>;
      case 3: 
        return <SentimentDissatisfiedIcon/>;
      default: return null;
    }
  };

  return (
    <div style={{ padding: "16px", backgroundColor: '#eee', borderRadius: "15px", marginBottom: "16px"}}>
      <Typography align="left" variant="h6">
        <br/>
        {entry.date} <FavoriteIcon/><br/>
        <i>{entry.description}</i> <br/>
        {getIcon()} <br/>
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

export default HealthCheckEntryComponent;