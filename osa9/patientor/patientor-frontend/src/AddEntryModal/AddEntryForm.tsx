import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection, TypeOption, SelectField } from "./FormField";
import { NewEntry } from "../types";
import { isValidDate, isValidHealthCeckValue } from "../utils";import { useStateValue } from "../state";

export type EntryFormValues = Omit<NewEntry, "id" | "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();


const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "Health check", label: "Health check" },
  { value: "Occupational healthcare", label: "Occupational healthcare" },
  { value: "-", label: "-" }
];

  return (
    <Formik
      initialValues={{
        type: "-",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1,
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        let errors:
          | { [field: string]: string }
          | {
            [key: string]: {
              [key: string]: string;
            };
          } = {};
        if (!values.type || values.type === "-") {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = "Please provide the date in the format YYYY-MM-DD";
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if ((values.type === "Hospital") && (values.healthCheckRating !== -1)) {
          errors.healthCheckRating = "Hospital entry does not support health check rate values";
        }
        if ((values.type === "Hospital") && (values.employerName)) {
          errors.employerName = "Hospital entry does not support employer name values";
        }
        if ((values.type === "Hospital") && (values.sickLeave?.startDate || values.sickLeave?.endDate)) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Hospital entry does not support sick leave start or end date values",
              endDate:
                "Hospital entry does not support sick leave start or end date values"
            }
          };
        }
        if ((values.type === "Hospital") && (values.discharge?.date && !isValidDate(values.discharge?.date))) {
          errors.discharge = "Please provide a discharge date in YYYY-MM-DD format.";
        }
        if ((values.type === "Health check") && (values.healthCheckRating === -1 ||!isValidHealthCeckValue(values.healthCheckRating))
        ){
          errors.healthCheckRating = "Please provide a valid health check rating between 0 and 3";
        }
        if ((values.type === "Health check") && (values.employerName)) {
          errors.employerName = "Health check entry does not support employer name values";
        }
        if ((values.type === "Health check") && (values.sickLeave?.startDate || values.sickLeave?.endDate)) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Health check entry does not support sick leave start or end date values",
              endDate:
                "Health check entry does not support sick leave start or end date values"
            }
          };
        }
        if ((values.type === "Health check") && (values.discharge?.date || values.discharge?.criteria)) {
          errors = {
            ...errors,
            discharge: {
              date:
                "Health check entry does not support discharge information values",
              criteria:
                "Health check entry does not support discharge information values",
            }
          };
        }
        if ((values.type === "Occupational healthcare") && (values.healthCheckRating !== -1)) {
          errors.healthCheckRating = "Occupational healthcare entry does not support health check rate values";
        }
        if ((values.type === "Occupational healthcare") && (!values.employerName)) {
          errors.employerName = requiredError;
        }
        if ((values.type === "Occupational healthcare") && (values.discharge?.date || values.discharge?.criteria)) {
          errors = {
            ...errors,
            discharge: {
              date:
                "Occupational healthcare entry does not support discharge information values",
              criteria:
                "Occupational healthcare entry does not support discharge information values",
            }
          };
        }
        if ((values.type === "Occupational healthcare") && values.sickLeave?.startDate && !isValidDate(values.sickLeave?.startDate)) {
          errors.discharge = "Please provide a start date in YYYY-MM-DD format.";
        }
        if ((values.type === "Occupational healthcare") && values.sickLeave?.endDate && !isValidDate(values.sickLeave?.endDate)) {
          errors = {
            ...errors,
            sickLeave: {
              startDate:
                "Please provide a start date in YYYY-MM-DD format.",
              endDate:
                "Please provide an end date in YYYY-MM-DD format."
            }
          };
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Entry type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={-1}
              max={3}
            />
            <Field
              label="Employer Name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeave Start Date"
              placeholder="Sick leave start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="SickleaveEnd Date"
              placeholder="Sick leave end date"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Field
              label="Discharge Date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;