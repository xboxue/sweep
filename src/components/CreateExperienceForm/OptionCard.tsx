import { CheckCircle, SvgIconComponent } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface Props {
  active: boolean;
  title: string;
  Icon: SvgIconComponent;
  onClick: () => void;
}

const OptionCard = ({ title, Icon, active, onClick }: Props) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 1,
      border: 1,
      borderColor: (theme) => theme.palette.divider,
      width: 140,
      height: 105,
      ...(active && {
        borderColor: (theme) => theme.palette.primary.main,
        borderWidth: 2,
      }),
      position: "relative",
      cursor: "pointer",
    }}
  >
    {active && (
      <CheckCircle
        fontSize="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: (theme) => theme.palette.primary.main,
        }}
      />
    )}
    <Icon
      color="action"
      sx={{
        mb: 1,
        height: 30,
        width: 30,
        ...(active && {
          color: (theme) => theme.palette.primary.main,
        }),
      }}
    />
    <Typography
      variant="subtitle2"
      color="textSecondary"
      sx={{
        ...(active && {
          color: (theme) => theme.palette.primary.main,
        }),
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default OptionCard;
