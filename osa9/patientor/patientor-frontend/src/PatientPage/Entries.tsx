import React from "react";

import { Entry } from "../types";
import HospitalEntryComponent from "./HospitalEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";
import { assertNever } from "../utils";

interface entryProps {
  entry: Entry;
}


const EntryComponent: React.FC<entryProps> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryComponent;