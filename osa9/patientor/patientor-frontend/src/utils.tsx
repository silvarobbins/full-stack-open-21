import {
  HealthCheckRating,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "./types";


export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isHealthCheckEntry = (values: any): values is HealthCheckEntry => {
  if (isOccupationalHealthcareEntry(values)) {
    return false;
  }
  if (values.sickLeave?.startDate || values.sickLeave?.endDate) {
    return false;
  }
  if (values.discharge?.date || values.discharge?.criteria) {
    return false;
  }
  return (
    values.healthCheckRating === HealthCheckRating.LowRisk ||
    values.healthCheckRating === HealthCheckRating.Healthy ||
    values.healthCheckRating === HealthCheckRating.HighRisk ||
    values.healthCheckRating === HealthCheckRating.CriticalRisk
  );
};

export const isOccupationalHealthcareEntry = (values: any): values is OccupationalHealthcareEntry => {
  if (values.discharge?.date || values.discharge?.criteria) {
    return false;
  }
  return values.employerName && values.employerName !== "";
};

export const isHospitalEntry = (values: any): values is HospitalEntry => {
  if (
    !values.healthCheckRating ||
    values.healthCheckRating === -1 ||
    !values.employerName ||
    values.employerName === ""
  ) {
    return true;
  }
  return false;
};

export const isValidDate = (date: any): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  const d = new Date(date);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date;
};

export const isValidHealthCeckValue = (value: any): boolean => {
  console.log(value)
  return (
    value === HealthCheckRating.Healthy ||
    value === HealthCheckRating.LowRisk ||
    value === HealthCheckRating.HighRisk ||
    value === HealthCheckRating.CriticalRisk
  );
};