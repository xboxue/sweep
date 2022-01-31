import { Close } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "react-dropzone/examples/theme.css";

const Dropzone = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setPreviewUrls([
        ...previewUrls,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography>Upload images</Typography>
      </div>
      <Box sx={{ display: "flex" }}>
        {previewUrls.map((url) => (
          <Box key={url}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <IconButton
                  onClick={() =>
                    setPreviewUrls(
                      previewUrls.filter((previewUrl) => previewUrl !== url)
                    )
                  }
                  size="small"
                >
                  <Close />
                </IconButton>
              }
            >
              <Avatar src={url} alt="preview" sx={{ width: 64, height: 64 }} />
            </Badge>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Dropzone;
