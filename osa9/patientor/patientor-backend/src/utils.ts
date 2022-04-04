import { NewPatient, Gender, Entry, BaseEntry, HealthCheckRating, NewEntry, SickLeave, Discharge, Diagnosis } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseTextField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error('Incorrect or missing field' + field);
  }

  return field;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }
  return date;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) return entries;
  if (entries.map((entry: any) => !isEntryType(entry))) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const isEntryType = (entry: any): entry is Entry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const isValidNewEntryType = (entry: any): entry is NewEntry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isValidNewEntryType(entry)) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }

  return entry;
};


const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  ) {
    return discharge;
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge-date");
    }
    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge-criteria");
    }
    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseTextField(discharge.criteria);

    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

const parseSickLeave = (sickleave: any): SickLeave => {
  if (
    !sickleave ||
    (Object.keys(sickleave).length === 0 && sickleave.constructor === Object)
  ) {
    return sickleave;
  } else {
    if (!sickleave.startDate) {
      throw new Error("Incorrect or missing start date for sickleave");
    }
    if (!sickleave.endDate) {
      throw new Error("Incorrect or missing end date for sickleave");
    }
    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
      startDate,
      endDate,
    };
  }
};

const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnosis["code"]> => {
  if (!diagnosisCode) return diagnosisCode;

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode");
  }

  const validDiagnosisCodes = diagnosisCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCode;
  } else {
    throw new Error("Incorrect diagnosisCode");
  }
};


export const toNewPatient = (newPatient: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseTextField(newPatient.name),
    dateOfBirth: parseDate(newPatient.dateOfBirth),
    ssn: parseTextField(newPatient.ssn),
    gender: parseGender(newPatient.gender),
    occupation: parseTextField(newPatient.occupation),
    entries: parseEntries(newPatient.entries) || [],
  };

  return newEntry;
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


export const toNewEntry = (newEntry: any): NewEntry => {
  let validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Entry not valid");

  let entry: Omit<BaseEntry, "id"> = {
    date: parseDate(validEntryType.date),
    description: parseTextField(validEntryType.description),
    specialist: parseTextField(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCode(validEntryType.diagnosisCodes),
  };

  switch (validEntryType.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHealthCheckRating(
          validEntryType.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseTextField(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave),
      };
    default:
      return assertNever(validEntryType);
  }
};

export default toNewPatient;