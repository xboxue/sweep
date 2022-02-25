import {
  alpha,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  Select,
  styled,
  TextFieldProps,
} from "@mui/material";

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  transform: "none",
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
  border: "1px solid #ced4da",
  fontSize: theme.typography.body2.fontSize,
  padding: "10px 12px",
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    "box-shadow",
  ]),
  "& .MuiInputBase-input": {
    padding: 0,
    "&:focus": {
      background: "none",
    },
  },
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "&.Mui-focused": {
    borderRadius: 4,
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    borderColor: theme.palette.primary.main,
  },
}));

const TextField = (props: TextFieldProps) => {
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps,
    type,
    value,
    variant = "standard",
    ...other
  } = props;

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;

  const InputMore = {};
  if (select) {
    // unset defaults from textbox inputs
    if (!SelectProps || !SelectProps.native) {
      InputMore.id = undefined;
    }
    InputMore["aria-describedby"] = undefined;
  }

  const InputElement = (
    <StyledInput
      aria-describedby={helperTextId}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      fullWidth={fullWidth}
      multiline={multiline}
      name={name}
      rows={rows}
      maxRows={maxRows}
      minRows={minRows}
      type={type}
      value={value}
      id={id}
      inputRef={inputRef}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      inputProps={inputProps}
      {...InputMore}
      {...InputProps}
    />
  );

  return (
    <FormControl
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      required={required}
      color={color}
      variant={variant}
      {...other}
    >
      {label && (
        <StyledInputLabel
          htmlFor={id}
          id={inputLabelId}
          {...InputLabelProps}
          shrink
        >
          {label}
        </StyledInputLabel>
      )}

      {select ? (
        <Select
          aria-describedby={helperTextId}
          id={id}
          labelId={inputLabelId}
          value={value}
          input={InputElement}
          {...SelectProps}
        >
          {children}
        </Select>
      ) : (
        InputElement
      )}

      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextField;
