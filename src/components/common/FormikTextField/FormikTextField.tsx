import { TextFieldProps } from "@mui/material";
import { useFormikContext } from "formik";
import { round } from "lodash";
import TextField from "../TextField/TextField";

interface Props {
  field: string;
  numberOptions?: {
    min?: number;
    max?: number;
    integer?: boolean;
  };
}

const FormikTextField = ({
  field,
  type,
  numberOptions = {},
  ...props
}: Props & TextFieldProps) => {
  const formik = useFormikContext<any>();
  const { min = 0, max, integer = false } = numberOptions;

  const numberProps: TextFieldProps = {
    inputProps: { min, max, step: integer ? undefined : "any" },
    onKeyPress: (event) => {
      if (
        (min >= 0 && event.key === "-") ||
        (integer && event.key === ".") ||
        event.key === "+" ||
        event.key === "e"
      ) {
        event.preventDefault();
      }
    },
    onBlur: (event) => {
      let value = event.target.value as number;
      if (value < min) {
        value = min;
      } else if (max && value > max) {
        value = max;
      } else if (integer && !Number.isInteger(event.target.value)) {
        value = round(event.target.value);
      } else {
        value = round(value, 2);
      }
      formik.setFieldValue(field, value);
    },
  };

  return (
    <TextField
      type={type}
      id={field}
      name={field}
      value={formik.values[field] ?? ""}
      onChange={(event) => {
        if (formik.errors[field]) formik.setFieldError(field, undefined);
        formik.handleChange(event);
      }}
      error={formik.touched[field] && !!formik.errors[field]}
      helperText={formik.touched[field] && formik.errors[field]}
      {...(type === "number" && numberProps)}
      {...props}
    />
  );
};

export default FormikTextField;
