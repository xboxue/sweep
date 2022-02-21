import { Box, Divider, Stack } from "@mui/material";
import FormHeader from "./FormHeader/FormHeader";
import FormSection, { Props as SectionProps } from "./FormSection/FormSection";

interface Props {
  title: string;
  onBack: () => void;
  error?: React.ReactNode;
  headerComponent?: React.ReactNode;
  sections: SectionProps[];
}

const FormLayout = ({
  title,
  headerComponent,
  onBack,
  error,
  sections,
}: Props) => (
  <>
    <FormHeader
      onBack={onBack}
      title={title}
      headerComponent={headerComponent}
    />
    <Divider sx={{ mb: 3 }} />
    {error}
    <Stack spacing={4} sx={{ pb: 5 }}>
      {sections.map((section, index) => (
        <Box key={section.title}>
          {index > 0 && <Divider sx={{ mb: 4 }} />}
          <FormSection {...section} />
        </Box>
      ))}
    </Stack>
  </>
);

export default FormLayout;
