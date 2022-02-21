import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  title: string;
  onBack: () => void;
  headerComponent: React.ReactNode;
}

const FormHeader = ({ onBack, title, headerComponent }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <IconButton onClick={onBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" sx={{ ml: 3 }}>
        {title}
      </Typography>
      {headerComponent}
    </Box>
  );
};

export default FormHeader;
