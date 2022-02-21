import { SvgIconComponent } from "@mui/icons-material";
import { Avatar, Box, Divider, Typography } from "@mui/material";

export interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  Icon: SvgIconComponent;
}

const FormSection = ({ title, description, children, Icon }: Props) => {
  return (
    <>
      <Box sx={{ display: "flex", mb: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ bgcolor: "rgb(224, 242, 254)", mr: 3, height: 48, width: 48 }}
        >
          <Icon sx={{ color: "rgb(2, 132, 199)" }} />
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pl: 9 }}>{children}</Box>
    </>
  );
};

export default FormSection;
