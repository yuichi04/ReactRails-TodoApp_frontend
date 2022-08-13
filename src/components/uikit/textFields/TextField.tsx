import React from "react";
import { TextField as MuiTextField } from "@mui/material";

type Props = {
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  error?: boolean;
};

const TextField: React.FC<Props> = React.memo(({ ...props }) => {
  return <MuiTextField {...props} margin="none" size="small" />;
});

export default TextField;
