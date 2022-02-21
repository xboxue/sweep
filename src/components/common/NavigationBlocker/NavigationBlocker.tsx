import { usePrompt } from "../../../hooks/usePrompt";

interface Props {
  message: string;
  when: boolean;
}

const NavigationBlocker = ({ message, when }: Props) => {
  usePrompt(message, when);

  return null;
};

export default NavigationBlocker;
