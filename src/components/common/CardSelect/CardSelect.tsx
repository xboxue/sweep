import { SvgIconComponent } from "@mui/icons-material";
import { Box } from "@mui/material";
import OptionCard from "./OptionCard";

interface Props {
  options: { value: string; title: string; Icon: SvgIconComponent }[];
  value: string;
  onChange: (value: string) => void;
}

const CardSelect = ({ options, value, onChange }: Props) => {
  return (
    <Box sx={{ display: "flex", mx: -1 }}>
      {options.map((option) => (
        <Box mx={1} key={option.value}>
          <OptionCard
            title={option.title}
            Icon={option.Icon}
            onClick={() => onChange(option.value)}
            active={option.value === value}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CardSelect;
