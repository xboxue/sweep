import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Popover,
  PopoverProps,
  Typography,
} from "@mui/material";
import { Info, WeekdayNumbers } from "luxon";
import { useState } from "react";

interface Props extends PopoverProps {
  onCopy: (to: WeekdayNumbers[]) => void;
}

const CopyTimesMenu = ({ onCopy, onClose, ...PopoverProps }: Props) => {
  const [copyTo, setCopyTo] = useState({});

  return (
    <Popover
      id="copy-menu"
      sx={{ p: 2 }}
      onClose={() => {
        onClose();
        setCopyTo({});
      }}
      {...PopoverProps}
    >
      <>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2">Copy times to...</Typography>
        </Box>
        {Info.weekdays("short").map((name, index) => {
          const day = index + 1;
          return (
            <MenuItem
              key={name}
              sx={{ py: 0 }}
              onClick={() => {
                setCopyTo({ ...copyTo, [day]: !copyTo[day] });
              }}
            >
              <Typography variant="inherit" sx={{ mr: "auto" }}>
                {name}
              </Typography>
              <Checkbox
                checked={!!copyTo[day]}
                onChange={() => setCopyTo({ ...copyTo, [day]: !copyTo[day] })}
                size="small"
                inputProps={{ "aria-label": "controlled" }}
              />
            </MenuItem>
          );
        })}
        <Box sx={{ px: 2, py: 1 }}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            onClick={() =>
              onCopy(
                Object.keys(copyTo)
                  .filter((to) => copyTo[to])
                  .map((day) => parseInt(day, 10))
              )
            }
          >
            Apply
          </Button>
        </Box>
      </>
    </Popover>
  );
};

export default CopyTimesMenu;
