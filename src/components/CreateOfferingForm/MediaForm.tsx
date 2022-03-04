import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import { zip } from "lodash";
import { useRef, useState } from "react";
import { DropzoneOptions, DropzoneRef } from "react-dropzone";
import "react-dropzone/examples/theme.css";
import {
  FileUploadUrl,
  useCreateFileUploadUrlsMutation,
} from "../../generated/graphql";
import Dropzone from "../common/Dropzone/Dropzone";

export const initialValues = {
  featuredImage: {
    url: null,
    altText: null,
    id: null,
  },
};

const MediaForm = () => {
  const formik = useFormikContext<typeof initialValues>();
  const [createFileUploadUrls] = useCreateFileUploadUrlsMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const dropzoneRef = useRef<DropzoneRef>();

  console.log(formik.values);
  const handleDrop: DropzoneOptions["onDrop"] = async (acceptedFiles) => {
    try {
      const { data } = await createFileUploadUrls({
        variables: {
          input: acceptedFiles.map((file) => ({
            mimeType: file.type,
            fileSize: file.size,
          })),
        },
      });

      if (
        !data?.createFileUploadUrls?.urls?.length ||
        data.createFileUploadUrls.urls.length !== acceptedFiles.length
      ) {
        throw new Error();
      }

      const uploads = zip(data.createFileUploadUrls.urls, acceptedFiles) as [
        FileUploadUrl,
        File
      ][];

      const urls = await Promise.all(
        uploads.map(async ([{ url, fields, resourceUrl }, file]) => {
          const formData = new FormData();
          formData.append("Content-Type", file.type);
          Object.entries(fields).forEach(([key, value]) =>
            formData.append(key, value)
          );
          formData.append("file", file);

          try {
            const response = await axios.post(url, formData);
            return resourceUrl;
          } catch (error) {
            console.log(error);
          }
        })
      );

      formik.setFieldValue("featuredImage.url", urls[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ width: 250 }}>
        <Menu
          onClose={() => setAnchorEl(null)}
          open={!!anchorEl}
          anchorEl={anchorEl}
          MenuListProps={{ dense: true }}
        >
          <MenuItem
            onClick={() => {
              formik.setFieldValue("featuredImage.url", null);
              setAnchorEl(null);
            }}
          >
            Remove
          </MenuItem>
        </Menu>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2">Featured image</Typography>
          {!!formik.values.featuredImage && (
            <Button
              size="small"
              variant="text"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              Edit
            </Button>
          )}
        </Box>
        {formik.values.featuredImage.url ? (
          <Box
            component="img"
            src={formik.values.featuredImage.url}
            sx={{
              objectFit: "contain",
              width: 250,
              height: 250,
              borderRadius: 1,
              border: 1,
              borderColor: (theme) => theme.palette.divider,
            }}
          />
        ) : (
          <Dropzone
            ref={dropzoneRef}
            label="Add image"
            DropzoneProps={{
              onDrop: handleDrop,
              maxFiles: 1,
              accept: "image/*",
            }}
            ContainerProps={{ sx: { borderRadius: 1 } }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default MediaForm;
