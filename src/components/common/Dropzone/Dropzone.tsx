import { Box, BoxProps, Chip } from "@mui/material";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";
import "react-dropzone/examples/theme.css";
import React from "react";

interface Props extends DropzoneProps {
  label: string;
  ContainerProps?: BoxProps;
  DropzoneProps?: DropzoneProps;
}

// eslint-disable-next-line react/display-name
const MyDropzone = React.forwardRef<DropzoneRef, Props>((props, ref) => {
  const { label, ContainerProps, DropzoneProps } = props;

  return (
    <Dropzone {...DropzoneProps} ref={ref}>
      {({ getRootProps, getInputProps }) => (
        <Box {...ContainerProps} {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Chip
            label={label}
            size="small"
            sx={{
              bgcolor: "rgb(224, 242, 254)",
              color: "rgb(2, 132, 199)",
              borderRadius: 1,
              typography: "subtitle2",
            }}
          />
        </Box>
      )}
    </Dropzone>
  );
});

export default MyDropzone;
