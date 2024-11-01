import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Container } from "./Container";
import { FieldErrors, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDefaultValues, formSchema, FormSchema } from "./formSchema";

function App() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const fullErrors: FieldErrors<Extract<FormSchema, { hasWorkExperience: true }>> = errors;

  const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    alert(JSON.stringify(data, null, 2))
  }
  return (
    <Container>
      <TextField 
      {...register('fullName')}
      label="Full Name"
      helperText={fullErrors.fullName?.message}
      error={!!fullErrors.fullName}
      />
      <FormControlLabel {...register('hasWorkExperience')}
        label='Work Experience?'
        control={<Checkbox />}
      />
      {hasWorkExperience &&
        <TextField
          {...register("companyName")}
          label="Company Name"
          helperText={fullErrors.companyName?.message}
          error={!!fullErrors.companyName}
        />
      }
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  )
}
export { App };