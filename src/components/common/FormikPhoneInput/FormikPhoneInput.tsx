import { Box, InputAdornment, MenuItem, useMediaQuery } from "@mui/material";
import React from "react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import FormikTextField from "../FormikTextField/FormikTextField";
import TextField from "../TextField/TextField";

const CountryFlag = ({ country }: { country: string }) => (
  <Box
    component="img"
    loading="lazy"
    width="20"
    src={`https://flagcdn.com/w20/${country.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
    alt={country}
  />
);

const PhoneCountrySelect = ({
  options,
  onChange,
  iconComponent: _,
  ...props
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <TextField
      onChange={(event) => onChange(event.target.value)}
      select
      InputProps={{
        sx: { border: 0, px: 0, "&.Mui-focused": { boxShadow: "none" } },
      }}
      size="small"
      SelectProps={{
        renderValue: (value) => <CountryFlag country={value} />,
      }}
      {...props}
    >
      {/* Remove international option */}
      {options.slice(1).map((option) => {
        if (isMobile)
          return (
            <option key={option.value} value={option.value}>
              {option.label} (+{getCountryCallingCode(option.value)})
            </option>
          );

        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label} (+{getCountryCallingCode(option.value)})
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const PhoneTextField = React.forwardRef((props, ref) => {
  return <FormikTextField {...props} inputRef={ref} />;
});

const PhoneInputContainer = ({ children }) => {
  return React.cloneElement(React.Children.toArray(children)[1], {
    InputProps: {
      startAdornment: (
        <InputAdornment position="start" sx={{ mr: 0 }}>
          {React.Children.toArray(children)[0]}
        </InputAdornment>
      ),
    },
  });
};

const FormikPhoneInput = (props) => {
  return (
    <PhoneInput
      inputComponent={PhoneTextField}
      countrySelectComponent={PhoneCountrySelect}
      containerComponent={PhoneInputContainer}
      {...props}
    />
  );
};

export default FormikPhoneInput;
