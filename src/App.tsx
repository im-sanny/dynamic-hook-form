import { Button, Checkbox, FormControlLabel, IconButton, TextField } from "@mui/material";
import { Container } from "./Container";
import { FieldErrors, SubmitHandler, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDefaultValues, formSchema, FormSchema } from "./formSchema";
import { AddCircleRounded, DeleteForeverRounded } from "@mui/icons-material";
import { useEffect } from "react";

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

  const { fields, replace, append, remove } = useFieldArray({ control, name: "languages" })

  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }> &
    Extract<FormSchema, { knowsOtherLanguages: true }>> = errors;

  const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });
  const knowsOtherLanguages = useWatch({ control, name: "knowsOtherLanguages" });

  useEffect(() =>{
    if (knowsOtherLanguages) {
      replace([{name:""}]);
    }
  },[knowsOtherLanguages, replace])

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
      <FormControlLabel {...register('knowsOtherLanguages')}
        label='Know Other Language'
        control={<Checkbox />}
      />
      {knowsOtherLanguages &&
        <>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField sx={{ width: '100%' }}
                {...register(`languages.${index}.name`)}
                label="Language Name"
                helperText={fullErrors.languages?.[index]?.name?.message}
                error={!!fullErrors.languages?.[index]?.name?.message}
              />
              <IconButton disabled={fields.length === 1}
                onClick={() => remove(index)}
                color="error"
              >
                <DeleteForeverRounded />
              </IconButton>
            </div>
          ))}
          <IconButton sx={{ width: 'fit-content' }}
            onClick={() => append({ name: '' })}
            color="success"
          >
            <AddCircleRounded />
          </IconButton>
        </>}
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  )
}
export { App };