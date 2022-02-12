import { TextField, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInput = ({ name, label, control }) => {
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            variant="standard"
            fullWidth
            label={label}
            required
          />
        )}
        name={name}
        control={control}
        defaultValue=""
      />
    </Grid>
  );
};

export default FormInput;
